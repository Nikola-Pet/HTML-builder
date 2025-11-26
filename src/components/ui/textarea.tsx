import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="a-text-area">
        <textarea
          ref={ref}
          {...props}
        ></textarea>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
