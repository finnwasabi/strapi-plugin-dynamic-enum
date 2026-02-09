import { Flex } from '@strapi/design-system';
import { ListPlus } from '@strapi/icons';
import styled from 'styled-components';

const IconBox = styled(Flex)`
  background-color: #fffbeb; /* light yellow background */
  border: 1px solid #fbbf24; /* yellow border */

  svg {
    width: 15px;
    height: 15px;
  }

  svg > path {
    fill: #f59e0b; /* amber/orange-yellow icon */
  }
`;

const PluginIcon = () => {
  return (
    <IconBox
      justifyContent="center"
      alignItems="center"
      width={7}
      height={6}
      hasRadius={true}
      aria-hidden={true}
    >
      <ListPlus />
    </IconBox>
  );
};

export default PluginIcon;
