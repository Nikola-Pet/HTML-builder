import { Button } from "@/components/ui/button";
import { Type, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CopyOptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "button" | "image";
  text?: string;
  link?: string;
  imageSrc?: string;
  imageLink?: string; // Link that wraps the image
}

export const CopyOptionsModal = ({
  open,
  onOpenChange,
  type,
  text,
  link,
  imageSrc,
  imageLink,
}: CopyOptionsModalProps) => {
  const handleCopyText = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Text copied to clipboard!");
        onOpenChange(false);
      } catch (err) {
        toast.error("Failed to copy text");
        console.error("Copy failed:", err);
      }
    }
  };

  const handleCopyLink = async () => {
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!");
        onOpenChange(false);
      } catch (err) {
        toast.error("Failed to copy link");
        console.error("Copy failed:", err);
      }
    }
  };

  const handleCopyImageSrc = async () => {
    if (imageSrc) {
      try {
        await navigator.clipboard.writeText(imageSrc);
        toast.success("Image URL copied to clipboard!");
        onOpenChange(false);
      } catch (err) {
        toast.error("Failed to copy image URL");
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "button" ? "Copy Button Data" : "Copy Image Data"}
          </DialogTitle>
          <DialogDescription>
            Choose what you want to copy to clipboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-4">
          {type === "button" && (
            <>
              {text && (
                <Button
                  variant="secondary"
                  onClick={handleCopyText}
                  className="w-full justify-start gap-3"
                >
                  <Type className="h-5 w-5" />
                  <div className="text-left flex-1">
                    <div className="font-semibold">Copy Button Text</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {text}
                    </div>
                  </div>
                </Button>
              )}
              {link && (
                <Button
                  variant="secondary"
                  onClick={handleCopyLink}
                  className="w-full justify-start gap-3"
                >
                  <LinkIcon className="h-5 w-5" />
                  <div className="text-left flex-1">
                    <div className="font-semibold">Copy Button Link</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {link}
                    </div>
                  </div>
                </Button>
              )}
            </>
          )}

          {type === "image" && (
            <>
              {imageSrc && (
                <Button
                  variant="secondary"
                  onClick={handleCopyImageSrc}
                  className="w-full justify-start gap-3"
                >
                  <ImageIcon className="h-5 w-5" />
                  <div className="text-left flex-1">
                    <div className="font-semibold">Copy Image URL</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {imageSrc}
                    </div>
                  </div>
                </Button>
              )}
              {imageLink && (
                <Button
                  variant="secondary"
                  onClick={handleCopyLink}
                  className="w-full justify-start gap-3"
                >
                  <LinkIcon className="h-5 w-5" />
                  <div className="text-left flex-1">
                    <div className="font-semibold">Copy Image Link</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {imageLink}
                    </div>
                  </div>
                </Button>
              )}
              {text && (
                <Button
                  variant="secondary"
                  onClick={handleCopyText}
                  className="w-full justify-start gap-3"
                >
                  <Type className="h-5 w-5" />
                  <div className="text-left flex-1">
                    <div className="font-semibold">Copy Alt Text</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {text}
                    </div>
                  </div>
                </Button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
