import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export type AdminTabParamList = {
  HomeTab: undefined;
  FamiliesTab: undefined;
  ChildrenTab: undefined;
  AgendaTab: undefined;
  OthersTab: undefined;
};

export type AdminAuthenticatedParamList = {
  AdminTabs: undefined;
  Profile: undefined;
  Families: undefined;
};

export type AdminHomeStackParamList = {
  Home: undefined;
};

export type AdminStackParamList = {
  FamiliesList: undefined;
  NewFamilyForm: undefined;
  FamilyMembers: undefined;
  AddMember: undefined;
  FamilyChildren: undefined;
  AddChild: undefined;
  CreateFamilySummary: undefined;
  FamilyDetail: { familyId: string };
};

export type AdminChildrenStackParamList = {
  ChildrenList: undefined;
};

export type AdminOthersStackParamList = {
  AdminSettings: undefined;
};

// ─── Screen Props Helpers ─────────────────────────────────────────────────────

export type AdminScreenProps<T extends keyof AdminStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AdminStackParamList, T>,
    BottomTabScreenProps<AdminTabParamList>
  >;
