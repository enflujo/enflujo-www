module.exports = {
  apps: [
    {
      name: 'enflujo-www',
      cwd: __dirname,
      script: './publico/server/entry.mjs',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: process.env.HOST || '127.0.0.1',
        PORT: process.env.PORT || '4001',
        DIRECTUS_URL: process.env.DIRECTUS_URL || 'https://api.enflujo.com',
      },
      time: true,
    },
  ],
};
