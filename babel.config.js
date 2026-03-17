module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // top level
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@types': './src/types',

          // auth
          '@auth': './src/features/auth',

          // profile
          '@profile': './src/features/profile',

          // registration
          '@registration': './src/features/registration',

          // admin
          '@admin': './src/features/admin',
          '@admin/families': './src/features/admin/families',
          '@admin/children': './src/features/admin/children',
          '@admin/agenda': './src/features/admin/agenda',
          '@admin/others': './src/features/admin/others',

          // parent
          '@parent': './src/features/parent',
          '@parent/home': './src/features/parent/home',
          '@parent/posts': './src/features/parent/posts',
          '@parent/family': './src/features/parent/family',
          '@parent/forum': './src/features/parent/forum',
          '@parent/others': './src/features/parent/others',
        },
      },
    ],
  ],
};
