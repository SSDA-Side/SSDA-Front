import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';

import { routes } from '@Routes/index';

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CookiesProvider>
          <RouterProvider router={router} />
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
