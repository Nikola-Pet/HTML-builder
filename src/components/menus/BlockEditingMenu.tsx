import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
  MoreVertical,
} from "lucide-react";

interface BlockEditingMenuProps {
  blockId: string;
  index: number;
  totalBlocks: number;
  onEdit: () => void;
  onDuplicate: (blockId: string) => void;
  onMove: (blockId: string, direction: "up" | "down") => void;
  onDelete: (blockId: string) => void;
}

export const BlockEditingMenu = ({
  blockId,
  index,
  totalBlocks,
  onEdit,
  onDuplicate,
  onMove,
  onDelete,
}: BlockEditingMenuProps) => {
  return (
    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 bg-white shadow-md"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDuplicate(blockId)}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onMove(blockId, "up")}
            disabled={index === 0}
          >
            <ChevronUp className="h-4 w-4 mr-2" />
            Move Up
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onMove(blockId, "down")}
            disabled={index === totalBlocks - 1}
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            Move Down
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(blockId)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
