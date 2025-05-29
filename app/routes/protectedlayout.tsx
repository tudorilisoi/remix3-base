import { Link, Outlet, useFetcher, useNavigate } from 'react-router'
import { authServer } from '~/auth/auth_server'
import type { Route } from './+types/protectedlayout'
import logo from '~/assets/logo-marelvi-service.svg'
import { toast } from 'sonner'
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
} from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/app-sidebar'

export async function loader({ context, request }: Route.LoaderArgs) {
  const session = await authServer.api.getSession({ headers: request.headers })
  console.log(`🚀 ~ loader ~ session:`, session)
  return { session }
}

function UserMenu({ session }) {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      if (!response.ok) {
        return toast.error(`Cannot logout, code: ${response.status}`)
      }
    } catch (error) {
      return toast.error(`Cannot logout: ${error?.toString() || 'unknown err'}`)
    }
    toast.success('Logged out')
    navigate('/login')
  }
  if (session === null) {
    return (
      <div>
        <Link className="text-white font-bold text-xl" to={'/login'}>
          Login
        </Link>
      </div>
    )
  }
  return <div onClick={logout}>Logat</div>
}

export default function ProtectedLayout({
  loaderData: { session },
}: Route.ComponentProps) {
  return (
    <div className="bg-foreground">
      <div className="min-h-screen flex flex-col bg-primary-foreground  ">
        <div id="header" className="flex items-center justify-center bg-brand px-2 pr-4">
          <div className="flex-1">
            <img
              src={logo}
              alt="Marelvi"
              className="block w-[20rem] dark:hidden"
            />
          </div>
          <div className="  h-full">
            <UserMenu session={session} />
          </div>
        </div>
        <SidebarProvider>
      <AppSidebar />
          <main className="p-4 min-h-full flex-1 flex flex-col">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
        <div className="mt-auto">Footer</div>
      </div>
    </div>
  )
}
