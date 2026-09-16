import test from 'node:test';
import assert from 'node:assert/strict';
import { coincide, contarOpciones, normalizar, ordenarEntradas } from '../src/utilidades/filtrosArchivo.ts';

const vacios = { soporte: '', procedencia: '', institucion: '', motivo: '' };
const entradas = [
  {
    id: '1',
    titulo: 'Árbol',
    identificador: 'EF_10',
    fecha: '2026-01-01',
    busqueda: normalizar('Árbol EF_10 Colección familiar'),
    campos: {
      soporte: ['Fílmico'],
      procedencia: ['Colección familiar'],
      institucion: ['Sin registrar'],
      motivo: ['Inspección', 'Digitalización', 'Inspección'],
    },
  },
  {
    id: '2',
    titulo: 'Bosque',
    identificador: 'EF_2',
    fecha: '2026-06-01',
    busqueda: normalizar('Bosque EF_2 Filmoteca'),
    campos: {
      soporte: ['Magnético'],
      procedencia: ['Filmoteca'],
      institucion: ['Universidad'],
      motivo: ['Digitalización'],
    },
  },
  {
    id: '3',
    titulo: 'Cine',
    identificador: '',
    fecha: '',
    busqueda: normalizar('Cine'),
    campos: {
      soporte: ['Fílmico'],
      procedencia: ['Sin registrar'],
      institucion: ['Sin registrar'],
      motivo: ['Sin registrar'],
    },
  },
];

test('combina todas las palabras sin distinguir tildes ni mayúsculas y cruza categorías', () => {
  assert.equal(coincide(entradas[0], 'ARBOL familiar', { ...vacios, motivo: 'Digitalización' }), true);
  assert.equal(coincide(entradas[0], 'ARBOL familiar', { ...vacios, procedencia: 'Filmoteca' }), false);
  assert.equal(coincide(entradas[0], 'ARBOL inexistente', vacios), false);
});

test('cuenta alternativas ignorando solo su propio filtro y no duplica motivos', () => {
  const seleccion = { ...vacios, motivo: 'Inspección' };
  assert.deepEqual(
    [...contarOpciones(entradas, '', seleccion, 'motivo')],
    [
      ['Inspección', 1],
      ['Digitalización', 2],
      ['Sin registrar', 1],
    ]
  );
  assert.deepEqual([...contarOpciones(entradas, '', seleccion, 'soporte')], [['Fílmico', 1]]);
  assert.equal(contarOpciones(entradas, 'bosque', seleccion, 'motivo').get('Digitalización'), 1);
});

test('admite metadatos faltantes y mantiene cero resultados para valores desconocidos', () => {
  assert.equal(coincide(entradas[2], '', { ...vacios, procedencia: 'Sin registrar' }), true);
  assert.equal(entradas.filter((entrada) => coincide(entrada, '', { ...vacios, soporte: 'Retirado' })).length, 0);
  assert.equal(contarOpciones([], '', vacios, 'motivo').size, 0);
});

test('ordena identificadores de forma natural, coloca vacíos al final y no modifica el origen', () => {
  assert.deepEqual(
    ordenarEntradas(entradas, 'identificador').map(({ id }) => id),
    ['2', '1', '3']
  );
  assert.deepEqual(
    entradas.map(({ id }) => id),
    ['1', '2', '3']
  );
  assert.deepEqual(
    ordenarEntradas(entradas, 'titulo').map(({ id }) => id),
    ['1', '2', '3']
  );
  assert.deepEqual(
    ordenarEntradas(entradas, 'recientes').map(({ id }) => id),
    ['2', '1', '3']
  );
});
