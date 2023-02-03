/** @type {import('tailwindcss').Config} */

const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

module.exports = {
  presets: ['../../../tsconfig.base.json'],
  content: [
    join(__dirname, './src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
