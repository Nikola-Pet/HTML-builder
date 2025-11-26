import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BlockData } from "@/contexts/EmailBuilderContext";

interface BlocksOrEmptyStateProps {
  blocks: BlockData[];
  onAddBlock: () => void;
  renderBlock: (block: BlockData, index: number) => React.ReactNode;
}

export const BlocksOrEmptyState = ({
  blocks,
  onAddBlock,
  renderBlock,
}: BlocksOrEmptyStateProps) => {
  if (blocks.length === 0) {
    return (
      <div className="bg-gray-50 p-4 flex justify-center">
        <div
          className="bg-white shadow-lg flex-shrink-0"
          style={{
            width: "640px",
            minWidth: "640px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div className="flex flex-col items-center justify-center py-20 px-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <Plus className="h-10 w-10 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                No blocks yet
              </h3>
              <p className="text-muted-foreground max-w-md">
                Start building your email by adding content blocks. Click the
                button below to get started.
              </p>
              <Button onClick={onAddBlock} icon="add">
                Add Your First Block
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{blocks.map((block, index) => renderBlock(block, index))}</>;
};
