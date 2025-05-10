export default () => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    version: '1.0.0',
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  swagger: {
    title: 'Rest API Docs',
    description:
      'This provides comprehensive documentation for all rest API endpoints',
    path: 'api-docs',
    theme: 'dark',
  },
});
