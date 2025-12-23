import { revalidateLogic, useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

const genders = ["Male", "Female"] as const

const schema = z.object({
  firstName: z.string().min(2, "A first name is required"),
  lastName: z.string().min(2, "A last name is required"),
  gender: z.enum(genders, "Gender is required"),
})

const PersonForm: React.FC = (props) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
      onSubmit: schema,
      onChange: schema,
      // onBlur: schema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
    listeners: {
      onChange: ({ formApi, fieldApi }) => {
        // autosave logic
        // if (formApi.state.isValid) {
        //   formApi.handleSubmit()
        // }

        // fieldApi represents the field that triggered the event.
        console.log(fieldApi.name, fieldApi.state.value)
        console.log(formApi.state)
      },
      onChangeDebounceMs: 500,
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        // console.log(form.)
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="firstName"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="lastName"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Last (family) name"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="gender"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field orientation="responsive" data-invalid={isInvalid}>
                <FieldContent>
                  <FieldLabel htmlFor="form-tanstack-select-gender">
                    Gender
                  </FieldLabel>
                  {/* <FieldDescription>
                    For best results, select the language you speak.
                  </FieldDescription> */}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldContent>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    id="form-tanstack-select-language"
                    aria-invalid={isInvalid}
                    className="min-w-30"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {genders.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )
          }}
        />
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isValid,
            state.isPristine,
          ]}
          children={([canSubmit, isSubmitting, isValid, isPristine]) => (
            <div className="flex gap-4 py-4">
              <Button
                type="submit"
                disabled={!isValid || !canSubmit || isPristine}
              >
                {isSubmitting ? "..." : "Submit"}
              </Button>
              <Button
                type="reset"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault()
                  form.reset()
                  console.log(`🚀 ~ PersonForm ~ form:`, form.state)
                }}
              >
                Reset
              </Button>
            </div>
          )}
        />
      </FieldGroup>
    </form>
  )
}
export default PersonForm
