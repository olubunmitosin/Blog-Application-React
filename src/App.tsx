import ProtectedRoute, { ProtectedRouteProps } from "./routes/ProtectedRoute";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import LandingLayout from './layouts/Landing';
import ErrorRouterElement from "./routes/ErrorRouterElement";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogLayout from "./layouts/Blog";
import BlogPage from "./pages/BlogPage";
import SinglePostPage from "./pages/SinglePostPage";
import ErrorPage from "./pages/ErrorPage";
import { useSessionContext } from "./components/SessionContext";

function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPath: path });
  }
  if (!sessionContext.redirectPath) {
    setRedirectPath('/');
  }

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingLayout />} errorElement={<ErrorRouterElement />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route path='/posts' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<BlogLayout />} />} errorElement={<ErrorRouterElement />}>
          <Route path='/posts' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<BlogPage />} />} />
          <Route path='/posts/:postId' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<SinglePostPage />} />} />
        </Route>
        <Route path='*' element={<LandingLayout />}>
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </>
    )
  );

  return (<RouterProvider router={router} />);
}

export default App;
