import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  /*
  layout('routes/auth/authlayout.tsx', [
  ]), */
  layout("routes/protectedlayout.tsx", [
    index("routes/home.tsx"),
    route("login", "routes/auth/login.tsx"),
    route("signup", "routes/auth/signup.tsx"),
  ]),
  route("api/auth/*", "routes/auth/auth.api.ts"),
] satisfies RouteConfig
