import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { useFormContext, useWatch } from "react-hook-form"

export function TaskBasicInfo() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()
  const description = useWatch({ control, name: "description" })

  return (
    <>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input {...register("title")} placeholder="e.g. Setup Appwrite Auth" />
        <FieldError
          errors={
            errors.title ? [{ message: errors.title.message as string }] : []
          }
        />
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            {...register("description")}
            rows={4}
            placeholder="Provide clear details..."
            className="resize-none"
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-xs">
              {description?.length || 0}/100
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldError
          errors={
            errors.description
              ? [{ message: errors.description.message as string }]
              : []
          }
        />
      </Field>
    </>
  )
}
