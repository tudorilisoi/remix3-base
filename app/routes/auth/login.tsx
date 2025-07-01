import { Loader2 } from "lucide-react"
import { Form, useNavigation } from "react-router"
import { toast } from "sonner"
import { authClient } from "~/auth/auth_client"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { cn } from "~/lib/utils"
import type { Route } from "./+types/login"

export async function clientAction({ request }: Route.ClientActionArgs) {
  // await new Promise((r) => setTimeout(r, 3000))

  const formData = await request.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await authClient.signIn.email({
    email: email.trim().toLowerCase(),
    password: password.trim(),
    callbackURL: "/",
  })
  console.log(`🚀 ~ clientAction ~ error:`, error)
  if (error) {
    toast.error(`clientAction err ${error.message}`)
  }
  return {
    error,
    redirect: "/",
  }
}

export default function Login({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const nav = useNavigation()
  const busy = nav.state !== "idle"
  return (
    <div
      className={cn(
        "flex-1 min-h-full flex flex-col justify-center align-center min-w-[35vw] max-w-[80vw] sm:max-w-[60vw] mx-auto ",
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" id="password" type="password" required />
              </div>
              <Button
                disabled={busy}
                type="submit"
                className="w-full bg-brand "
              >
                {busy ? <Loader2 className="w4-h4 animate-spin" /> : "Login"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
