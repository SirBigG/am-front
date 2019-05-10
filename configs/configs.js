const env = process.env.ENV || 'development';

const configs = {
  development: {
    api: 'http://nginx:8000',
  },
  staging: {
    api: 'https://api.staging.com',
  },
  production: {
    api: 'https://api.production.com',
  },
}[env];

export default configs;
