"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { taskSchema } from "@/validation"

export default function TaskForm() {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      tags: "",
    },
  })

  const description = useWatch({
    control: form.control,
    name: "description",
  })

  const onSubmit = (data: z.infer<typeof taskSchema>) => {
    // Parse the comma-separated string into an array of trimmed tags
    const formattedData = {
      ...data,
      tags: data.tags
        ? data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
    }

    console.log("Submitting to Appwrite:", formattedData)
    // Here you will eventually add your Appwrite document creation logic
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        {/* Title */}
        <Field>
          <FieldLabel>Title</FieldLabel>
          <Input
            {...form.register("title")}
            placeholder="e.g. Setup Appwrite Auth"
          />
          <FieldError
            errors={
              form.formState.errors.title
                ? [{ message: form.formState.errors.title.message }]
                : []
            }
          />
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel>Description</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              {...form.register("description")}
              rows={4}
              placeholder="Provide clear details about this task..."
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
              form.formState.errors.description
                ? [{ message: form.formState.errors.description.message }]
                : []
            }
          />
        </Field>

        {/* Status and Priority (Side-by-side) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Status */}
          <Field>
            <FieldLabel>Status</FieldLabel>
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
              errors={
                form.formState.errors.status
                  ? [{ message: form.formState.errors.status.message }]
                  : []
              }
            />
          </Field>

          {/* Priority */}
          <Field>
            <FieldLabel>Priority</FieldLabel>
            <Controller
              control={form.control}
              name="priority"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
              errors={
                form.formState.errors.priority
                  ? [{ message: form.formState.errors.priority.message }]
                  : []
              }
            />
          </Field>
        </div>

        {/* Tags */}
        <Field>
          <FieldLabel>Tags (Optional)</FieldLabel>
          <Input
            {...form.register("tags")}
            placeholder="Frontend, Bug, High Priority"
          />
          <FieldDescription className="text-xs text-muted-foreground">
            Separate multiple tags with commas.
          </FieldDescription>
        </Field>
      </FieldGroup>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <Button type="button" variant="ghost">
          Cancel
        </Button>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  )
}
