module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
