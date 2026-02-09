export default {
  register({ strapi }) {
    strapi.customFields.register({
      name: 'dynamic-enum',
      plugin: 'dynamic-enum',
      type: 'string',
    });
  },
};
