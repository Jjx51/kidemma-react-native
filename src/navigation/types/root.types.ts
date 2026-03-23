export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Admin: undefined;
  Profile: undefined;
  CompleteRegistration: undefined;
};

export type CompleteRegistrationStackParamList = {
  CompleteRegistrationForm: undefined;
  ConfirmChildren: undefined;
  CompleteChildForm: { childId: string };
  RegistrationSuccess: undefined;
};
