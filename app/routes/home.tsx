import { db } from "~/server/db"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "People over time" },
    { name: "description", content: "Deep history" },
  ]
}

export async function loader({ context }: Route.LoaderArgs) {
  const communities = await db.community.findMany()
  const persons = await db.person.findMany()
  const evp = db.eventPersons.findMany()
  return {
    communities,
    persons,
    evp,
  }
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  console.log("Rendering the home route")
  return (
    <div>
      <h1>Overview</h1>
    </div>
  )
}
