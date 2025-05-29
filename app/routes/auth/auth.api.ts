import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router"
import { authServer } from "~/auth/auth_server"

export async function loader({ request, context }: LoaderFunctionArgs) {
  return authServer.handler(request)
}

export async function action({ request, context }: ActionFunctionArgs) {
  return authServer.handler(request)
}
