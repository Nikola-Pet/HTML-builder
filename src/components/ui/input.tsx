import * as React from "react";
 
interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}
 
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="a-text-field">
        {label && <label className="a-text-field__label">{label}</label>}
        <input
          type={type}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
 
export { Input };