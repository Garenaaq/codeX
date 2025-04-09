import { createBrowserRouter } from "react-router-dom";
import { FilterProvider } from "../context/FilterContext";
import {
  Login,
  Main,
  PageNotFound,
  Profile,
  Project,
  Registr,
} from "../../pages";
import { MainLayout } from "../../shared/layouts";
import { WrapperRoute } from "./WrapperRoute";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WrapperRoute />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/registr",
        element: (
          <PublicRoute>
            <Registr />
          </PublicRoute>
        ),
      },
      {
        path: "/",
        element: (
          <MainLayout>
            <FilterProvider>
              <Main />
            </FilterProvider>
          </MainLayout>
        ),
      },
      {
        path: "/users/:userId",
        element: (
          <PrivateRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </PrivateRoute>
        ),
      },
      {
        path: "/users/:userId/project/:projectId",
        element: (
          <MainLayout>
            <Project />
          </MainLayout>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
