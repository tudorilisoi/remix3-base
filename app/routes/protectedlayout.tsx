import { Link, Outlet, useNavigate } from "react-router"
import { toast } from "sonner"
import { authServer } from "~/auth/auth_server"
import { AppSidebar } from "~/components/app-sidebar"
import { Button } from "~/components/ui/button"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import logo from "~/welcome/logo-dark.svg"
import type { Route } from "./+types/protectedlayout"

export async function loader({ context, request }: Route.LoaderArgs) {
  const session = await authServer.api.getSession({ headers: request.headers })
  console.log(`🚀 ~ loader ~ session:`, session)
  return { session }
}
type Session = Awaited<ReturnType<typeof authServer.api.getSession>>

function UserMenu({ session }: { session: Session }) {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
      if (!response.ok) {
        return toast.error(`Cannot logout, code: ${response.status}`)
      }
    } catch (error) {
      return toast.error(`Cannot logout: ${error?.toString() || "unknown err"}`)
    }
    toast.success("Logged out")
    navigate("/login")
  }
  if (session === null) {
    return (
      <Button>
        <Link className="text-white font-bold text-xl" to={"/login"}>
          Login
        </Link>
      </Button>
    )
  }
  return <Button onClick={logout}>{session.user.name}</Button>
}

export default function ProtectedLayout({
  loaderData: { session },
}: Route.ComponentProps) {
  return (
    <div className="dark text-foreground">
      <div className="min-h-screen flex flex-col bg-primary-foreground  ">
        <div
          id="header"
          className="flex items-center justify-center bg-brand px-2 pr-4"
        >
          <div className="flex-1 py-4 ">
            <img src={logo} alt="RR app" className="block w-[10rem]" />
          </div>
          <div className="  py-2">
            <UserMenu session={session} />
          </div>
        </div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className="p-4 min-h-screen flex-1 flex flex-col">
            <Outlet />
          </main>
        </SidebarProvider>
        <div className="mt-auto">Footer</div>
      </div>
    </div>
  )
}
