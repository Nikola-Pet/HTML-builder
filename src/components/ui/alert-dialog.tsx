import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type AlertDialogType =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "error";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  headline?: string;
  description?: string;
  type?: AlertDialogType;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOptional?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  optionalLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  headline,
  description,
  type = "primary",
  onConfirm,
  onCancel,
  onOptional,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  optionalLabel = "Optional button",
  className,
  children,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleOptional = () => {
    onOptional?.();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="m-dialog -floating-shadow-s -secondary"
      onClick={handleBackdropClick}
      onClose={handleClose}
      aria-labelledby={
        headline ? "dialog-headline" : title ? "dialog-title" : undefined
      }
      aria-describedby={description ? "dialog-description" : undefined}
    >
      <div className={`m-dialog__remark --${type}`}></div>

      <div className="m-dialog__header">
        {title && (
          <div className="m-dialog__title flex items-center gap-2">
            <i
              className={`a-icon a-button__icon boschicon-bosch-ic-alert-${type}`}
            ></i>
            <span>{title}</span>
          </div>
        )}
        <Button
          variant="tertiary"
          onClick={handleClose}
          icon="close"
          aria-label="close dialog"
          className="a-button--integrated -without-label"
        />
      </div>

      <hr className="a-divider" />

      <div className="m-dialog__content">
        {headline && (
          <div className="m-dialog__headline" id="dialog-headline">
            {headline}
          </div>
        )}
        {description && (
          <div className="m-dialog__body" id="dialog-description">
            {description}
          </div>
        )}
        {children && <div className="m-dialog__body">{children}</div>}

        <div className="m-dialog__actions">
          {onOptional && (
            <Button
              variant="secondary"
              onClick={handleOptional}
            >
              {optionalLabel}
            </Button>
          )}
          {onConfirm && (
            <Button
              variant="primary"
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          )}
          {onCancel && (
            <Button
              variant="secondary"
              onClick={handleCancel}
            >
              {cancelLabel}
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
};
