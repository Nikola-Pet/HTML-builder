import { AlertDialog, AlertDialogType } from "@/components/ui/alert-dialog";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationModalProps) => {

  return (
    <AlertDialog
      open={isOpen}
      onClose={onClose}
      type="error"
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onClose}
      confirmLabel={confirmText}
      cancelLabel={cancelText}
    />
  );
};
