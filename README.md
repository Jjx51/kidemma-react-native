# Kidemma — React Native

Children's activity and class management app for parents. This is one of four implementations of Kidemma (Native iOS, Native Android, React Native, Flutter) — all sharing a single Firebase project.

---

## Prerequisites

- Node.js 18+
- Ruby 3.2.0 (via rbenv)
- Xcode 15+
- Android Studio + SDK 36
- CocoaPods via Bundler

If you haven't set up your environment yet, follow the [React Native environment setup guide](https://reactnative.dev/docs/set-up-your-environment).

---

## Firebase Setup

This project uses Firebase for authentication. The config files are **not committed to git** and must be added manually after cloning. For access contact jorge.l.hernandez

1. Go to [Firebase Console](https://console.firebase.google.com) → Kidemma project → Project Settings
2. Download `GoogleService-Info.plist` → place at `ios/kidemmaReactNative/GoogleService-Info.plist`
3. Download `google-services.json` → place at `android/app/google-services.json`

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. iOS — install pods
```bash
# First time only — install bundler dependencies
cd ios && bundle install && cd ..

# Every time native dependencies change
yarn pods
```

### 3. Link font assets
```bash
npx react-native-asset
cp node_modules/react-native-vector-icons/Fonts/Ionicons.ttf android/app/src/main/assets/fonts/
```

### 4. Start Metro
```bash
yarn start

# Reset cache if you have module resolution issues
yarn start:clean
```

### 5. Run the app
```bash
# iOS — target specific simulator
yarn ios --simulator "iPhone 16e"

# iOS — run on physical device
yarn ios:device

# Android
yarn android

# Clean Android build
yarn clean:android
```

---

## Project Structure
```
src/
  assets/          # fonts, images
  components/      # shared UI components (AppHeader, Button, etc.)
  features/        # feature modules (auth, profile, home, etc.)
    auth/
      components/
      hooks/
      screens/
      services/
      store/
      types/
  navigation/      # navigators and type definitions
  theme/           # colors, typography, spacing, shadows
  hooks/           # shared hooks
  utils/           # helpers
```

---

## Path Aliases

| Alias          | Path                  |
|----------------|-----------------------|
| `@theme`       | `src/theme`           |
| `@components`  | `src/components`      |
| `@features`    | `src/features`        |
| `@navigation`  | `src/navigation`      |
| `@assets`      | `src/assets`          |
| `@hooks`       | `src/hooks`           |
| `@services`    | `src/services`        |
| `@store`       | `src/store`           |
| `@utils`       | `src/utils`           |

---

## Tech Stack

- **React Native** 0.80 — New Architecture disabled (pending dependency support)
- **Navigation** — React Navigation v7 (native stack + bottom tabs)
- **State** — Zustand
- **Auth** — Firebase Auth via `@react-native-firebase`
- **Icons** — react-native-vector-icons (Ionicons)
- **Fonts** — Poppins (body), Ginger Biscuit (titles — personal use only, replace before production)

---

## Notes

- New Architecture is disabled on both platforms (`newArchEnabled=false` in `android/gradle.properties`, `RCT_NEW_ARCH_ENABLED=0` during pod install) due to compatibility issues with current dependencies
- Always open `ios/kidemmaReactNative.xcworkspace`, never `.xcodeproj`
- Run `yarn ios` with `--simulator` flag to avoid attempting install on WiFi-paired devices