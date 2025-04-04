export const routes = {
  auth: {
    root: '/auth',
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  dashboard: {
    root: '/dashboard',
  },
  compliance: {
    root: '/compliance',
    // TODO: add other routes in feature
  },
  settings: {
    root: '/settings',
  },
  protected: {
    root: '/(protected)',
  },
};
