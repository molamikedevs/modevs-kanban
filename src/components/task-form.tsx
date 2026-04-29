import type { Task } from "@/types/index"

import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"

import { useTaskForm } from "@/hooks/use-task-form"
import { useTaskSubmit } from "@/hooks/use-task-submit"

import { AvatarField, TagsField } from "./optional-fields"
import { StatusPriorityFields } from "./status-priority-field"
import { TitleDescriptionFields } from "./title-description-field"

interface TaskFormProps {
  taskToEdit?: Task | null
  onSuccessCallback?: () => void
}

export default function TaskForm({
  taskToEdit,
  onSuccessCallback,
}: TaskFormProps) {
  const { form, descriptionLength } = useTaskForm(taskToEdit)
  const { onSubmit, isPending } = useTaskSubmit({
    taskToEdit,
    onSuccess: onSuccessCallback,
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <TitleDescriptionFields
          control={form.control}
          errors={form.formState.errors}
          register={form.register}
          descriptionLength={descriptionLength}
        />

        <StatusPriorityFields
          control={form.control}
          errors={form.formState.errors}
        />

        <TagsField register={form.register} />

        <AvatarField
          register={form.register}
          setValue={form.setValue}
          currentAvatar={taskToEdit?.userAvatar}
        />
      </FieldGroup>

      <div className="flex justify-end gap-3 border-t pt-4">
        <Button
          className="cursor-pointer"
          type="button"
          variant="ghost"
          onClick={() => onSuccessCallback?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending} className="cursor-pointer" type="submit">
          {isPending ? "Saving..." : taskToEdit ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  )
}
