import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// ─── Auth Stack ───────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// ─── Others Stack ─────────────────────────────────────────────────────────────

export type OthersStackParamList = {
  OthersMenu: undefined;
  About: undefined;
  Staff: undefined;
  Contact: undefined;
  Partnerships: undefined;
  Feedback: undefined;
};

// ─── Main Tab ─────────────────────────────────────────────────────────────────

export type MainTabParamList = {
  Home: undefined;
  Posts: undefined;
  Family: undefined;
  Forum: undefined;
  Others: undefined; // renders OthersStackNavigator
};

// ─── Home Stack (nested inside Inicio tab) ────────────────────────────────────

export type HomeStackParamList = {
  Home: undefined;
  EventDetail: { eventId: string };
  ClassDetail: { classId: string; childName: string };
};

// ─── Posts Stack ──────────────────────────────────────────────────────────────

export type PostsStackParamList = {
  PostsList: undefined;
  PostDetail: { postId: string };
};

// ─── Family Stack ─────────────────────────────────────────────────────────────

export type FamilyStackParamList = {
  FamilyHome: undefined;
  ChildDetail: { childId: string };
};

// ─── Forum Stack ──────────────────────────────────────────────────────────────

export type ForumStackParamList = {
  ForumList: undefined;
  ForumPostDetail: { postId: string };
  CreateForumPost: undefined;
};

// ─── Root Navigator ───────────────────────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

// ─── Screen Props Helpers ─────────────────────────────────────────────────────

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type PostsScreenProps<T extends keyof PostsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PostsStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type FamilyScreenProps<T extends keyof FamilyStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FamilyStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type ForumScreenProps<T extends keyof ForumStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ForumStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;

export type OthersScreenProps<T extends keyof OthersStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OthersStackParamList, T>,
    BottomTabScreenProps<MainTabParamList>
  >;
