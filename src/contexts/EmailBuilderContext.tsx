import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BlockData {
  id: string;
  type: "image-text" | "banner" | "headline" | "twin-teaser" | "paragraph";
  content: Record<string, any>;
}

interface EmailBuilderContextType {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  newsletterId: string | null;
  draftId: string | null;
  newsletterName: string;
  template: string;
  language: string;
  addBlock: (block: BlockData) => void;
  updateBlock: (id: string, content: Record<string, any>) => void;
  deleteBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveBlock: (id: string, direction: "up" | "down") => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  overrideBlocks: (blocks: BlockData[]) => void;
  setSubjectLine: (value: string) => void;
  setPreheader: (value: string) => void;
  setNewsletterId: (id: string | null) => void;
  setDraftId: (id: string | null) => void;
  setNewsletterName: (name: string) => void;
  setTemplate: (template: string) => void;
  setLanguage: (language: string) => void;
}

const EmailBuilderContext = createContext<EmailBuilderContextType | undefined>(
  undefined
);

export const EmailBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [subjectLine, setSubjectLine] = useState("");
  const [preheader, setPreheader] = useState("");
  const [newsletterId, setNewsletterId] = useState<string | null>(null);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [newsletterName, setNewsletterName] = useState("Untitled Newsletter");
  const [template, setTemplate] = useState("masterTemplateBI");
  const [language, setLanguage] = useState("EN");

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
        subjectLine,
        preheader,
        newsletterId,
        draftId,
        newsletterName,
        template,
        language,
        addBlock,
        updateBlock,
        deleteBlock,
        duplicateBlock,
        moveBlock,
        reorderBlocks,
        overrideBlocks,
        setSubjectLine,
        setPreheader,
        setNewsletterId,
        setDraftId,
        setNewsletterName,
        setTemplate,
        setLanguage,
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
