import { initializeApp, getApps } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import Config from 'react-native-config';

const SECONDARY_APP_NAME = 'KidemmaSecondaryApp';

export async function getSecondaryAuth() {
  const existing = getApps().find(app => app.name === SECONDARY_APP_NAME);

  const app =
    existing ??
    (await initializeApp(
      {
        apiKey: Config.FIREBASE_API_KEY,
        projectId: Config.FIREBASE_PROJECT_ID!,
        appId: Config.FIREBASE_APP_ID!,
        databaseURL: 'https://kidemma-default-rtdb.firebaseio.com',
        storageBucket: 'kidemma-932eb.firebasestorage.app',
        messagingSenderId: '603709341379'
      },
      SECONDARY_APP_NAME,
    ));

  return getAuth(app);
}
