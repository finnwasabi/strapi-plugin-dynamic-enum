# Strapi Plugin Dynamic Enum

A Strapi v5 custom field plugin that provides an enum field with the ability to dynamically create new options on the fly.

## Features

- 🎯 Single select dropdown (like standard enum)
- ✨ Create new options directly from the input field
- 🔍 Search/filter existing options
- 💾 Automatically includes saved values in options list
- 🎨 Clean UX with Strapi Design System

## Installation

```bash
npm install @tunghtml/strapi-plugin-dynamic-enum
# or
yarn add @tunghtml/strapi-plugin-dynamic-enum
```

## Configuration

Add the plugin to your `config/plugins.js`:

```javascript
module.exports = {
  // ...
  'dynamic-enum': {
    enabled: true,
  },
};
```

## Usage

1. Go to **Content-Type Builder**
2. Select a content type or create a new one
3. Add a new field and select **Dynamic Enum** from custom fields
4. In the field settings, add initial options as JSON array:
   ```json
   ["Option 1", "Option 2", "Option 3"]
   ```
5. Save and use!

## How It Works

When editing an entry:

- Select from existing options in the dropdown
- Type to search/filter options
- If you type a value that doesn't exist, the plugin will show a "Create '...'" option
- Click to create and select the new option immediately
- Newly created options are automatically added to the list for future use

## Example

Initial options: `["Pending", "In Progress", "Completed"]`

User types "Cancelled" → Plugin shows "Create 'Cancelled'" → User clicks → "Cancelled" is now available as an option.

## Data Storage

Values are stored as strings in the database, just like standard enum fields.

## Requirements

- Strapi v5.x
- Node.js >= 18.0.0

## License

MIT

## Author

[tunghtml](https://github.com/finnwasabi)

## Repository

[https://github.com/finnwasabi/strapi-plugin-dynamic-enum](https://github.com/finnwasabi/strapi-plugin-dynamic-enum)
