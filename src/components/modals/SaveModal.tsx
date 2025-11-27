import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, keywords: string[]) => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), keywords);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Save Newsletter</DialogTitle>
          <DialogDescription>
            Enter a name and optional keywords to save your newsletter.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter newsletter name"
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Keywords</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Add a keyword"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddKeyword();
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddKeyword}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 rounded text-sm flex items-center gap-1"
                >
                  {kw}
                  <Button
                    type="button"
                    variant="tertiary"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => handleRemoveKeyword(kw)}
                    aria-label={`Remove ${kw}`}
                  >
                    ×
                  </Button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="primary" onClick={handleSave} disabled={!name.trim()}>
              Save
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveModal;
