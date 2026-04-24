import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { PageLoader } from "./components/LoadingSpinner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Lazy pages
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MatchesPage = lazy(() => import("./pages/MatchesPage"));
const MatchDetailPage = lazy(() => import("./pages/MatchDetailPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminMatchesPage = lazy(() => import("./pages/admin/AdminMatchesPage"));
const AdminPaymentsPage = lazy(() => import("./pages/admin/AdminPaymentsPage"));
const AdminResultsPage = lazy(() => import("./pages/admin/AdminResultsPage"));

// Root layout wrapper
function RootLayout() {
  return (
    <AuthProvider>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </AuthProvider>
  );
}

// Protected route guard component
function ProtectedOutlet() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) return <PageLoader label="Authenticating..." />;
  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }
  return <Outlet />;
}

function AdminOutlet() {
  const { isAuthenticated, isAdmin, isInitializing } = useAuth();

  if (isInitializing) return <PageLoader label="Authenticating..." />;
  if (!isAuthenticated || !isAdmin) {
    throw redirect({ to: "/dashboard" });
  }
  return <Outlet />;
}

// Routes
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const matchesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/matches",
  component: MatchesPage,
});

const matchDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/match/$id",
  component: MatchDetailPage,
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results/$matchId",
  component: ResultsPage,
});

// Protected routes parent
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedOutlet,
});

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const paymentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/payment/$matchId",
  component: PaymentPage,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: ProfilePage,
});

// Admin routes parent
const adminParentRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-guard",
  component: AdminOutlet,
});

const adminRoute = createRoute({
  getParentRoute: () => adminParentRoute,
  path: "/admin",
  component: AdminPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminParentRoute,
  path: "/admin/users",
  component: AdminUsersPage,
});

const adminMatchesRoute = createRoute({
  getParentRoute: () => adminParentRoute,
  path: "/admin/matches",
  component: AdminMatchesPage,
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => adminParentRoute,
  path: "/admin/payments",
  component: AdminPaymentsPage,
});

const adminResultsRoute = createRoute({
  getParentRoute: () => adminParentRoute,
  path: "/admin/results",
  component: AdminResultsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  matchesRoute,
  matchDetailRoute,
  resultsRoute,
  protectedRoute.addChildren([dashboardRoute, paymentRoute, profileRoute]),
  adminParentRoute.addChildren([
    adminRoute,
    adminUsersRoute,
    adminMatchesRoute,
    adminPaymentsRoute,
    adminResultsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
