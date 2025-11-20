import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BlockData {
  id: string;
  type: "image-text" | "banner" | "headline" | "twin-teaser" | "paragraph";
  content: Record<string, any>;
}

interface EmailBuilderContextType {
  blocks: BlockData[];
  addBlock: (block: BlockData) => void;
  updateBlock: (id: string, content: Record<string, any>) => void;
  deleteBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (id: string, direction: "up" | "down") => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  overrideBlocks: (blocks: BlockData[]) => void;
}

const EmailBuilderContext = createContext<EmailBuilderContextType | undefined>(undefined);

export const EmailBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  const addBlock = (block: BlockData) => {
    setBlocks((prev) => [...prev, block]);
  };

  const updateBlock = (id: string, content: Record<string, any>) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const duplicateBlock = (id: string) => {
    const blockToDuplicate = blocks.find((block) => block.id === id);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: `block-${Date.now()}-${Math.random()}`,
      };
      const index = blocks.findIndex((block) => block.id === id);
      setBlocks((prev) => [
        ...prev.slice(0, index + 1),
        newBlock,
        ...prev.slice(index + 1),
      ]);
    }
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id);
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < blocks.length - 1)
    ) {
      const newBlocks = [...blocks];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];
      setBlocks(newBlocks);
    }
  };

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setBlocks(result);
  };

  const overrideBlocks = (newBlocks: BlockData[]) => {
    setBlocks(newBlocks);
  };

  return (
    <EmailBuilderContext.Provider
      value={{
        blocks,
        addBlock,
        updateBlock,
        deleteBlock,
        duplicateBlock,
        moveBlock,
        reorderBlocks,
        overrideBlocks,
      }}
    >
      {children}
    </EmailBuilderContext.Provider>
  );
};

export const useEmailBuilder = () => {
  const context = useContext(EmailBuilderContext);
  if (!context) {
    throw new Error("useEmailBuilder must be used within EmailBuilderProvider");
  }
  return context;
};
