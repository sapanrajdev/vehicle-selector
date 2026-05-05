module.exports = {
  overrides: [
    {
      files: ['backend/**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      extends: ['react-app'],
    },
  ],
};
