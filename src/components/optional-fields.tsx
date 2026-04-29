import { useRef, useState } from "react"
import type { UseFormRegister, UseFormSetValue } from "react-hook-form"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { TaskFormValues } from "@/hooks/use-task-form"
import { uploadAssigneeAvatar } from "@/services/storage"

interface TagsFieldProps {
  register: UseFormRegister<TaskFormValues>
}

export function TagsField({ register }: TagsFieldProps) {
  return (
    <Field>
      <FieldLabel>Tags (Optional)</FieldLabel>
      <Input {...register("tags")} placeholder="Frontend, Bug, High Priority" />
      <FieldDescription className="text-xs text-muted-foreground">
        Separate multiple tags with commas.
      </FieldDescription>
    </Field>
  )
}

interface AvatarFieldProps {
  // register is no longer needed for the file input itself but kept
  // so the hidden field stays registered with RHF for form resets.
  register: UseFormRegister<TaskFormValues>
  setValue: UseFormSetValue<TaskFormValues>
  currentAvatar?: string
}

export function AvatarField({
  register,
  setValue,
  currentAvatar,
}: AvatarFieldProps) {
  const [preview, setPreview] = useState<string | undefined>(currentAvatar)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    // User cancelled the file picker — leave existing preview intact
    if (!file) return

    setUploadError(null)
    setIsUploading(true)

    try {
      const url = await uploadAssigneeAvatar(file)
      setValue("userAvatar", url, { shouldValidate: true })
      setPreview(url)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Upload failed — please try a different image."
      setUploadError(message)
      if (inputRef.current) inputRef.current.value = ""
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setValue("userAvatar", undefined, { shouldValidate: true })
    setPreview(undefined)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor="userAvatar">Assignee Avatar (Optional)</Label>

      {/* Hidden RHF field holds the Appwrite URL — not shown to the user */}
      <input type="hidden" {...register("userAvatar")} />

      <div className="flex items-center gap-3">
        {/* Avatar preview */}
        {preview ? (
          <img
            src={preview}
            alt="Assignee avatar preview"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground ring-1 ring-border">
            ?
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Input
            id="userAvatar"
            ref={inputRef}
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={handleFileChange}
            className="cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-xs file:text-foreground hover:file:bg-muted/80 disabled:opacity-50"
          />
          {preview && !isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-left text-[10px] text-destructive hover:underline"
            >
              Remove image
            </button>
          )}
        </div>
      </div>

      {isUploading && (
        <p className="text-[10px] text-muted-foreground">Uploading…</p>
      )}
      {uploadError && (
        <p className="text-[10px] text-destructive">{uploadError}</p>
      )}
      {!isUploading && !uploadError && (
        <p className="text-[10px] text-muted-foreground">
          Accepted formats: JPG, PNG, WebP. Max 5 MB.
        </p>
      )}
    </div>
  )
}
