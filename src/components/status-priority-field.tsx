import type { Control, FieldErrors } from "react-hook-form"
import { Controller } from "react-hook-form"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { TaskFormValues } from "@/hooks/use-task-form"

interface StatusPriorityFieldsProps {
  control: Control<TaskFormValues>
  errors: FieldErrors<TaskFormValues>
}

export function StatusPriorityFields({
  control,
  errors,
}: StatusPriorityFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field>
        <FieldLabel>Status</FieldLabel>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODO">To Do</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError
          errors={errors.status ? [{ message: errors.status.message }] : []}
        />
      </Field>

      <Field>
        <FieldLabel>Priority</FieldLabel>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError
          errors={errors.priority ? [{ message: errors.priority.message }] : []}
        />
      </Field>
    </div>
  )
}
