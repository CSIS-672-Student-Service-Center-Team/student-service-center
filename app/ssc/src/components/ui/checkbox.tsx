import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="flex items-center">
                <input
                    type="checkbox"
                    ref={ref}
                    className={cn(
                        "h-4 w-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary",
                        className
                    )}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={props.id}
                        className="ml-2 text-sm font-medium text-gray-900"
                    >
                        {label}
                    </label>
                )}
            </div>
        )
    }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }