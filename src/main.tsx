import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppThemeProvider from './contexts/AppTheme';

// 👇 Aggiunte per React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Crea il client per React Query
const queryClient = new QueryClient();

// Crea il router
const router = createRouter({
  routeTree,
  context: {
    queryClient, // opzionale, utile se vuoi passarlo nei loader/route context
  },
});

// Registra il router per type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
