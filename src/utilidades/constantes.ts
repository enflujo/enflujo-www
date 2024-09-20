import type { ImageObject, Organization } from 'schema-dts';

export const LogoEnFlujo: ImageObject = {
  '@id': '#logoEnFlujo',
  '@type': 'ImageObject',
  author: '#julianCamiloGarcia',
  contentLocation: 'Bogotá, D.C., Colombia',
  contentUrl: '',
  dateCreated: '',
  datePublished: '',
  description: '',
  name: '',
};

export const OrgEnFlujo: Organization = {
  '@id': '',
  '@type': 'ResearchOrganization',
  address: '',
  description: '',
  funder: '@',
  foundingDate: '',
  foundingLocation: '',
  name: 'Laboratorio EnFlujo',
  alternateName: 'EnFlujo',
  keywords: [],
  logo: '#logoEnFlujo',
};
