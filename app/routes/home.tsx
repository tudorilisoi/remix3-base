import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import PersonForm from "~/dsl/person/PersonForm"
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
  const evp = db.eventParticipants.findMany()
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
      <h1 className="my-4">Your slice of history</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="flex w-full gap-2 ">
          <TabsTrigger value="people" className="">
            People
          </TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="people">
          +
          <PersonForm />
        </TabsContent>
        <TabsContent value="timeline">Timeline here</TabsContent>
      </Tabs>
    </div>
  )
}
