import type { Control, FieldErrors } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import type { TaskFormValues } from "@/hooks/use-task-form"

interface TitleDescriptionFieldsProps {
  control: Control<TaskFormValues>
  errors: FieldErrors<TaskFormValues>
  register: (name: keyof TaskFormValues) => object
  descriptionLength: number
}

export function TitleDescriptionFields({
  errors,
  register,
  descriptionLength,
}: TitleDescriptionFieldsProps) {
  return (
    <>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input {...register("title")} placeholder="e.g. Setup Appwrite Auth" />
        <FieldError
          errors={errors.title ? [{ message: errors.title.message }] : []}
        />
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <InputGroup>
          <InputGroupTextarea
            {...register("description")}
            rows={4}
            placeholder="Provide clear details about this task..."
            className="resize-none"
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-xs">
              {descriptionLength}/100
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <FieldError
          errors={
            errors.description ? [{ message: errors.description.message }] : []
          }
        />
      </Field>
    </>
  )
}
