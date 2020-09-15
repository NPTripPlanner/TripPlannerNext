import { configure } from '@storybook/react';

// automatically import all files from src and ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(js|ts|tsx)$/), module);
