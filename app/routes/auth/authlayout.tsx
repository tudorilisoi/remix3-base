import { Outlet } from "react-router"

export default function ProtectedLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-foreground  container mx-auto items-center justify-center">
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}
