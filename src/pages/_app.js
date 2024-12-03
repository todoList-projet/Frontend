import '@/styles/globals.css';
import MainLayout from '@/components/Layout.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/router';

const noLayoutPages = ['/', '/login', '/register']; // Pages sans layout
const unprotectedRoutes = ['/', '/register', '/login']; // Pages accessibles sans token

export default function App({ Component, pageProps }) {
  const router = useRouter();
  if (!router || !router.pathname) {
    return null;
  }
  const isNoLayoutPage = noLayoutPages.includes(router.pathname);
  const isUnprotectedRoute = unprotectedRoutes.includes(router.pathname);

  return (
      <QueryClientProvider client={queryClient}>
        {isNoLayoutPage ? (
            <Component {...pageProps} />
        ) : (
            <MainLayout>
              {isUnprotectedRoute ? (
                  <Component {...pageProps} />
              ) : (
                  <ProtectedRoute>
                    <Component {...pageProps} />
                  </ProtectedRoute>
              )}
            </MainLayout>
        )}
      </QueryClientProvider>
  );
}
