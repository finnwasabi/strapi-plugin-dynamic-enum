import {
  Combobox,
  ComboboxOption,
  DesignSystemProvider,
  Field,
} from '@strapi/design-system';
import { useNotification } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from 'styled-components';

const DynamicEnumInput = ({
  name,
  value,
  onChange,
  intlLabel,
  label,
  required,
  error,
  disabled = false,
  attribute,
}) => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();

  const [options, setOptions] = useState(() => {
    const initialOptions = attribute?.options?.enum || attribute?.options || [];
    let opts = [];
    if (typeof initialOptions === 'string') {
      try {
        const parsed = JSON.parse(initialOptions);
        if (Array.isArray(parsed)) {
          opts = parsed;
        } else {
          // If valid JSON but not an array (e.g. string/number), treat as text
          opts = initialOptions
            .split('\n')
            .map((o) => o.trim())
            .filter(Boolean);
        }
      } catch {
        // Not valid JSON, treat as newline-separated text
        opts = initialOptions
          .split('\n')
          .map((o) => o.trim())
          .filter(Boolean);
      }
    } else {
      opts = Array.isArray(initialOptions) ? initialOptions : [];
    }

    // Add current value to options if it doesn't exist
    if (value && !opts.includes(value)) {
      opts = [...opts, value];
    }

    return opts;
  });

  const [searchValue, setSearchValue] = useState('');

  // Add current value to options if it doesn't exist (for when loading saved data)
  useEffect(() => {
    if (value && !options.includes(value)) {
      setOptions((prev) => [...prev, value]);
    }
  }, [value, options]);

  const handleInputChange = (value) => {
    // Handle both string and event object
    const newValue =
      typeof value === 'string' ? value : value?.target?.value || '';
    setSearchValue(newValue);
  };

  const handleCreateOption = (newValue) => {
    const trimmedValue = String(newValue || '').trim();

    if (!trimmedValue) {
      return;
    }

    if (options.includes(trimmedValue)) {
      onChange({ target: { name, value: trimmedValue, type: 'string' } });
      setSearchValue(''); // Reset search
      return;
    }

    const updatedOptions = [...options, trimmedValue];
    setOptions(updatedOptions);
    onChange({ target: { name, value: trimmedValue, type: 'string' } });
    setSearchValue(''); // Reset search

    toggleNotification({
      type: 'success',
      message: `Created and selected "${trimmedValue}"`,
    });
  };

  const handleChange = (selectedValue) => {
    onChange({ target: { name, value: selectedValue, type: 'string' } });
    setSearchValue(''); // Reset search after selection
  };

  const searchStr = String(searchValue || '');

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchStr.toLowerCase())
  );

  return (
    <DesignSystemProvider theme={theme}>
      <Field.Root
        name={name}
        required={required}
        error={error}
        disabled={disabled}
      >
        <Field.Label>
          {intlLabel?.id ? formatMessage(intlLabel) : label || name}
        </Field.Label>

        <Combobox
          value={value || ''}
          onChange={handleChange}
          onInputChange={handleInputChange}
          placeholder="Select or type to create"
          disabled={disabled}
          creatable
          onCreateOption={handleCreateOption}
        >
          {filteredOptions.map((option) => (
            <ComboboxOption key={option} value={option}>
              {option}
            </ComboboxOption>
          ))}
        </Combobox>

        <Field.Error />
      </Field.Root>
    </DesignSystemProvider>
  );
};

export default DynamicEnumInput;
