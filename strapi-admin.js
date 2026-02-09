import PluginIcon from './admin/src/components/PluginIcon';

export default {
  register(app) {
    app.customFields.register({
      name: 'dynamic-enum',
      pluginId: 'dynamic-enum',
      type: 'string',
      intlLabel: {
        id: 'dynamic-enum.label',
        defaultMessage: 'Dynamic Enum',
      },
      intlDescription: {
        id: 'dynamic-enum.description',
        defaultMessage: 'Single select with ability to create new options',
      },
      icon: PluginIcon,
      components: {
        Input: async () => import('./admin/src/components/DynamicEnumInput'),
      },
      options: {
        base: [
          {
            sectionTitle: {
              id: 'dynamic-enum.options.base.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'options',
                type: 'textarea',
                intlLabel: {
                  id: 'dynamic-enum.options.enum',
                  defaultMessage: 'Initial Options',
                },
                description: {
                  id: 'dynamic-enum.options.enum.description',
                  defaultMessage:
                    'Enter initial enum values as JSON array: ["Option 1", "Option 2"]',
                },
                placeholder: {
                  id: 'dynamic-enum.options.enum.placeholder',
                  defaultMessage: '["Option 1", "Option 2", "Option 3"]',
                },
              },
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'dynamic-enum.options.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'dynamic-enum.options.requiredField.description',
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
        advanced: [],
      },
    });
  },
};
