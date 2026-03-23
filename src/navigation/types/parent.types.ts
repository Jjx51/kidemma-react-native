import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type ParentTabParamList = {
  HomeTab: undefined;
  PostsTab: undefined;
  FamilyTab: undefined;
  ForumTab: undefined;
  OthersTab: undefined;
};

export type ParentAuthenticatedParamList = {
  ParentTabs: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  EventDetail: { eventId: string };
  ClassDetail: { classId: string; childName: string };
};

export type PostsStackParamList = {
  PostsList: undefined;
  PostDetail: { postId: string };
};

export type FamilyStackParamList = {
  FamilyHome: undefined;
  ChildDetail: { childId: string };
};

export type ForumStackParamList = {
  ForumList: undefined;
  ForumPostDetail: { postId: string };
  CreateForumPost: undefined;
};

export type OthersStackParamList = {
  OthersMenu: undefined;
  About: undefined;
  Staff: undefined;
  Contact: undefined;
  Partnerships: undefined;
  Feedback: undefined;
};

// ─── Screen Props Helpers ─────────────────────────────────────────────────────

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    BottomTabScreenProps<ParentTabParamList>
  >;

export type PostsScreenProps<T extends keyof PostsStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<PostsStackParamList, T>,
    BottomTabScreenProps<ParentTabParamList>
  >;

export type FamilyScreenProps<T extends keyof FamilyStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<FamilyStackParamList, T>,
    BottomTabScreenProps<ParentTabParamList>
  >;

export type ForumScreenProps<T extends keyof ForumStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ForumStackParamList, T>,
    BottomTabScreenProps<ParentTabParamList>
  >;

export type OthersScreenProps<T extends keyof OthersStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<OthersStackParamList, T>,
    BottomTabScreenProps<ParentTabParamList>
  >;
