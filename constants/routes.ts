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
    samples: '/compliance/samples',
    viewSample: '/samples/:id',
    teacher: '/compliance/:id',
    // TODO: add other routes in feature
  },
  samples: {
    viewSample: '/samples/:id',
  },
  settings: {
    root: '/settings',
    setup: '/settings/setup',
  },
  profile: {
    root: '/profile',
  },
};
