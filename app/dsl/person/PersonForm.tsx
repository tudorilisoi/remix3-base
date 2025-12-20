import {
  revalidateLogic,
  useForm,
  type AnyFieldApi,
} from "@tanstack/react-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Field, FieldError, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  )
}

const schema = z.object({
  firstName: z.string().min(2, "A first name is required"),
  lastName: z.string().min(2, "A last name is required"),
})

const PersonForm: React.FC = (props) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
      onSubmit: schema,
      onChange: schema,
      onBlur: schema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })
  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          // console.log(form.)
          form.handleSubmit()
        }}
      >
        <div>
          <form.Field
            name="firstName"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              console.log(`🚀 ~ PersonForm ~ field:`, field, isInvalid)
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="First (given) name"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                    // <FieldInfo field={field} />
                  )}
                </Field>
              )
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </Button>
              <Button
                type="reset"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault()
                  form.reset()
                }}
              >
                Reset
              </Button>
            </>
          )}
        />
      </form>
    </div>
  )
}
export default PersonForm
