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

This project uses Firebase for authentication and Firestore as its database. Config files are **not committed to git** and must be added manually after cloning. For access contact jorge.l.hernandez.

1. Go to [Firebase Console](https://console.firebase.google.com) → Kidemma project → Project Settings
2. Download `GoogleService-Info.plist` → place at `ios/kidemmaReactNative/GoogleService-Info.plist`
3. Download `google-services.json` → place at `android/app/google-services.json`
4. Create a `.env` file at the project root (see `.env.example` for required keys)

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
yarn assets
```

### 4. Run the app

```bash
# iOS — target specific simulator
yarn ios

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
├── assets/                  # fonts, images
├── components/              # shared UI components (MainTabsHeader, etc.)
├── features/
│   ├── auth/                # login, auth store, useAuth hook
│   ├── profile/             # profile screen (shared between roles)
│   ├── registration/        # one-time registration completion flow
│   ├── admin/
│   │   ├── families/        # family creation and management
│   │   ├── children/        # children list (admin view)
│   │   ├── agenda/          # agenda (admin view)
│   │   └── others/          # admin settings
│   └── parent/
│       ├── home/            # home feed
│       ├── posts/           # posts list and detail
│       ├── family/          # family view (parent)
│       ├── forum/           # forum list and detail
│       └── others/          # about, staff, contact, etc.
├── navigation/
│   ├── navigators/
│   │   ├── root/            # AppNavigator
│   │   ├── admin/           # AdminAuthenticatedNavigator, AdminTabNavigator, stacks
│   │   ├── parent/          # ParentAuthenticatedNavigator, ParentTabNavigator, stacks
│   │   └── completeRegistration/
│   └── types/               # param list types per navigator
├── services/                # Firebase instances, secondary auth
├── theme/                   # colors, typography, spacing, shadows
├── types/                   # shared domain types (Family, Child, Member, enums)
├── hooks/                   # shared hooks
└── utils/                   # helpers
```

---

## Path Aliases

| Alias             | Path                          |
| ----------------- | ----------------------------- |
| `@theme`          | `src/theme`                   |
| `@components`     | `src/components`              |
| `@features`       | `src/features`                |
| `@navigation`     | `src/navigation`              |
| `@assets`         | `src/assets`                  |
| `@hooks`          | `src/hooks`                   |
| `@services`       | `src/services`                |
| `@utils`          | `src/utils`                   |
| `@types`          | `src/types`                   |
| `@auth`           | `src/features/auth`           |
| `@profile`        | `src/features/profile`        |
| `@registration`   | `src/features/registration`   |
| `@admin`          | `src/features/admin`          |
| `@admin/families` | `src/features/admin/families` |
| `@admin/children` | `src/features/admin/children` |
| `@admin/agenda`   | `src/features/admin/agenda`   |
| `@admin/others`   | `src/features/admin/others`   |
| `@parent`         | `src/features/parent`         |
| `@parent/home`    | `src/features/parent/home`    |
| `@parent/posts`   | `src/features/parent/posts`   |
| `@parent/family`  | `src/features/parent/family`  |
| `@parent/forum`   | `src/features/parent/forum`   |
| `@parent/others`  | `src/features/parent/others`  |

---

## User Roles

| Role     | Access                                                |
| -------- | ----------------------------------------------------- |
| `admin`  | Manages families, children, members — full app access |
| `parent` | Views their family's content, children, posts, forum  |

### Registration Flow

**Admin:**

1. Creates a family with members and children in the app
2. Members receive a password reset email as their invite
3. Admin session is preserved via a secondary Firebase Auth instance

**Parent:**

1. Receives invite email → sets password on Firebase hosted page
2. Opens app → logs in
3. Completes registration (name, phone, role)
4. Confirms linked children
5. Gains access to ParentTabNavigator

---

## Tech Stack

- **React Native** 0.80 — New Architecture disabled (pending dependency support)
- **Navigation** — React Navigation v7 (native stack + bottom tabs)
- **State** — Zustand
- **Auth** — Firebase Auth via `@react-native-firebase` v22 (modular API)
- **Database** — Firestore via `@react-native-firebase/firestore` v22 (modular API)
- **Icons** — react-native-vector-icons (Ionicons)
- **Fonts** — Poppins (body), Ginger Biscuit (Not implemented yet due to licence issues)
- **Splash** — react-native-bootsplash
- **Env** — react-native-config

---

## Notes

- New Architecture is disabled on both platforms (`newArchEnabled=false` in `android/gradle.properties`, `RCT_NEW_ARCH_ENABLED=0` during pod install) due to compatibility issues with current dependencies
- Always open `ios/kidemmaReactNative.xcworkspace`, never `.xcodeproj`
- Run `yarn ios` with `--simulator` flag to avoid attempting install on WiFi-paired devices
- Ginger Biscuit font requires a commercial license before production use
- Firebase config files and `.env` are gitignored — see Firebase Setup section
