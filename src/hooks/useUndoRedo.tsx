import { useEffect, useRef, useCallback, useState } from "react";
import { BlockData } from "@/contexts/EmailBuilderContext";
import {
  UndoRedoManager,
  createStateSnapshot,
  areStatesDifferent,
  EditorState,
} from "@/utils/undoRedo";

interface UseUndoRedoProps {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  setSubjectLine: (value: string) => void;
  setPreheader: (value: string) => void;
  overrideBlocks: (blocks: BlockData[]) => void;
}

interface UseUndoRedoReturn {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  saveState: () => void;
}

/**
 * Custom hook for undo/redo functionality in the email builder
 */
export function useUndoRedo({
  blocks,
  subjectLine,
  preheader,
  setSubjectLine,
  setPreheader,
  overrideBlocks,
}: UseUndoRedoProps): UseUndoRedoReturn {
  // Create manager instance (persists across renders)
  const managerRef = useRef<UndoRedoManager>(new UndoRedoManager());
  const isRestoringRef = useRef(false);
  const initializedRef = useRef(false);

  // Track if we can undo/redo with state to trigger re-renders
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Update can undo/redo flags
  const updateFlags = useCallback(() => {
    const newCanUndo = managerRef.current.canUndo();
    const newCanRedo = managerRef.current.canRedo();
    setCanUndo(newCanUndo);
    setCanRedo(newCanRedo);
    console.log(
      `🔄 Flags updated - canUndo: ${newCanUndo}, canRedo: ${newCanRedo}`
    );
  }, []);

  // Save initial state on mount
  useEffect(() => {
    if (!initializedRef.current) {
      const initialState = createStateSnapshot(blocks, subjectLine, preheader);
      managerRef.current.pushState(initialState);
      updateFlags();
      initializedRef.current = true;
      console.log("🎬 Initial state saved");
    }
  }, []); // Only run on mount

  // Save state to history
  const saveState = useCallback(() => {
    // Don't save state while restoring from undo/redo
    if (isRestoringRef.current) {
      return;
    }

    const newState = createStateSnapshot(blocks, subjectLine, preheader);
    const currentState = managerRef.current.getCurrentState();

    // Only push if state has changed
    if (areStatesDifferent(currentState, newState)) {
      managerRef.current.pushState(newState);
      updateFlags();
    }
  }, [blocks, subjectLine, preheader, updateFlags]);

  // Undo function
  const undo = useCallback(() => {
    const previousState = managerRef.current.undo();
    if (previousState) {
      isRestoringRef.current = true;
      restoreState(previousState, setSubjectLine, setPreheader, overrideBlocks);
      updateFlags();
      // Small delay to ensure state is restored before allowing new saves
      setTimeout(() => {
        isRestoringRef.current = false;
      }, 100);
    }
  }, [setSubjectLine, setPreheader, overrideBlocks, updateFlags]);

  // Redo function
  const redo = useCallback(() => {
    const nextState = managerRef.current.redo();
    if (nextState) {
      isRestoringRef.current = true;
      restoreState(nextState, setSubjectLine, setPreheader, overrideBlocks);
      updateFlags();
      // Small delay to ensure state is restored before allowing new saves
      setTimeout(() => {
        isRestoringRef.current = false;
      }, 100);
    }
  }, [setSubjectLine, setPreheader, overrideBlocks, updateFlags]);

  return {
    undo,
    redo,
    canUndo,
    canRedo,
    saveState,
  };
}

/**
 * Helper function to restore a state
 */
function restoreState(
  state: EditorState,
  setSubjectLine: (value: string) => void,
  setPreheader: (value: string) => void,
  overrideBlocks: (blocks: BlockData[]) => void
): void {
  setSubjectLine(state.subjectLine);
  setPreheader(state.preheader);
  overrideBlocks(state.blocks);
  console.log(`✅ State restored: ${state.blocks.length} blocks`);
}
