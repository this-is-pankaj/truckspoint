'use client';

import { cn } from "@/lib/utils";
import { ChangeEvent, ReactNode, useCallback, useState } from "react";
import { ZodOptional, ZodString } from "zod";

type InputGroupProps = {
  label?: ReactNode;
  errors?: string;
  fieldSchema?: ZodString | ZodOptional<ZodString>;
  hasBeenSubmitted?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
const InputGroup = ({ className, label, fieldSchema, errors, hasBeenSubmitted, ...restProps }: InputGroupProps) => {
  const baseClass = "px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";
  const requiredClass = "after:content-['*'] after:text-red-500 after:ml-1";

  const [value, setValue] = useState("")
  const [touched, setTouched] = useState(false)
  const getErrors = useCallback(() => {
    if(!fieldSchema) return []
    const validationResult = fieldSchema.safeParse(value)
    return validationResult.success
      ? []
      : validationResult.error.flatten().formErrors
  }, [fieldSchema, value])

  const fieldErrors = errors || getErrors()
  const shouldRenderErrors = errors || hasBeenSubmitted || touched

  const handleBlur = () => setTouched(true)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  return (
    <div className="flex items-center gap-2">
      {
        !label
          ? null
          : <label className={cn("text-sm", {
            [requiredClass]: restProps.required,
          })}>
            {label}
          </label>
      }
      <div className="flex flex-col gap-1">
        <input
          {...restProps}
          className={cn(baseClass, className)}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          type={restProps.type || "text"}
        />
       {
          errors
          ? <p className="text-sm text-red-600 px-2">{errors}</p>
          : null
       }
      </div>
    </div>
  )
}

export default InputGroup;
