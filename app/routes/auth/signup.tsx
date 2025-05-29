import { Form, Link, redirect } from 'react-router'
import { authClient } from '~/auth/auth_client'

import type { Route } from './+types/signup'
import { db } from '~/server/db'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Signup' }, { name: 'description', content: 'Signup page' }]
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const users = await db.user.findMany()
  console.log(`🚀 ~ loader ~ users:`, users)
  return users
  // return auth.api.getSession(request)
}

/* export const action = async ({ request, context }: Route.ActionArgs) => {
  // const result = await authClient
  // console.log(`🚀 ~ action ~ result:`, result)
  // return result
  // return auth.handler(request)
  // const body = await request.formData();
  // const email = body.get("email") as string;
  // if(!email){
  //   return null
  // }
  // return await authClient.signUp.email({email,password:'test12345678', name:'xxx'})
  return auth.handler(request)
} */

  export async function clientAction({ request }: Route.ClientActionArgs) {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
  
 
    const { error } = await authClient.signUp.email({
      email: email.trim().toLowerCase(),
      // name: name.trim(),
      name: 'Vasile',
      password: password.trim(),
      callbackURL: "/",
      
    });
    console.log(`🚀 ~ clientAction ~ error:`, error)
  
   
    return redirect("/signup");
  }
  

export default function Signup({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <p>Signup</p>
      <Form method="post">
        <input type="text" name="email" />
        <input type="text" name="password" />
        <input type="submit" name="Submit" />
      </Form>
      <Link to={'/'}>Home</Link>
    </div>
  )
}
