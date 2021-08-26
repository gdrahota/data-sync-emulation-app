const routes = [
  {
    path: '/',
    component: () => import('layouts/main-layout'),
    children: [
      { path: '', component: () => import('pages/index') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-404'),
  },
]

export default routes
