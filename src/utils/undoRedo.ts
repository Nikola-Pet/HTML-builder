import { BlockData } from "@/contexts/EmailBuilderContext";

/**
 * State snapshot for undo/redo functionality
 */
export interface EditorState {
  blocks: BlockData[];
  subjectLine: string;
  preheader: string;
  timestamp: number;
}

/**
 * Undo/Redo Manager Class
 * Manages state history for undo and redo operations
 */
export class UndoRedoManager {
  private history: EditorState[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 50; // Maximum number of states to keep

  /**
   * Push a new state to the history
   * Clears any forward history if we're not at the end
   */
  pushState(state: EditorState): void {
    // Remove any states after current index (if user made changes after undo)
    this.history = this.history.slice(0, this.currentIndex + 1);

    // Add new state
    this.history.push({
      ...state,
      timestamp: Date.now(),
    });

    // Keep history size under limit
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }

    console.log(
      `📝 State pushed. History size: ${this.history.length}, Current index: ${this.currentIndex}`
    );
  }

  /**
   * Get the previous state (for undo)
   */
  undo(): EditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const state = this.history[this.currentIndex];
      console.log(
        `⬅️ Undo to index ${this.currentIndex}. Blocks: ${state.blocks.length}`
      );
      return state;
    }
    console.log("⬅️ Cannot undo - at the beginning of history");
    return null;
  }

  /**
   * Get the next state (for redo)
   */
  redo(): EditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const state = this.history[this.currentIndex];
      console.log(
        `➡️ Redo to index ${this.currentIndex}. Blocks: ${state.blocks.length}`
      );
      return state;
    }
    console.log("➡️ Cannot redo - at the end of history");
    return null;
  }

  /**
   * Check if undo is available
   */
  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if redo is available
   */
  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Get current state
   */
  getCurrentState(): EditorState | null {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.history = [];
    this.currentIndex = -1;
    console.log("🗑️ History cleared");
  }

  /**
   * Get history info for debugging
   */
  getHistoryInfo(): {
    size: number;
    currentIndex: number;
    canUndo: boolean;
    canRedo: boolean;
  } {
    return {
      size: this.history.length,
      currentIndex: this.currentIndex,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    };
  }
}

/**
 * Helper function to create a state snapshot
 */
export function createStateSnapshot(
  blocks: BlockData[],
  subjectLine: string,
  preheader: string
): EditorState {
  return {
    blocks: deepCloneBlocks(blocks),
    subjectLine,
    preheader,
    timestamp: Date.now(),
  };
}

/**
 * Deep clone blocks to avoid reference issues
 */
export function deepCloneBlocks(blocks: BlockData[]): BlockData[] {
  return blocks.map((block) => ({
    ...block,
    content: JSON.parse(JSON.stringify(block.content)),
  }));
}

/**
 * Compare two states to see if they're different
 * (to avoid pushing duplicate states)
 */
export function areStatesDifferent(
  state1: EditorState | null,
  state2: EditorState
): boolean {
  if (!state1) return true;

  // Check if blocks are different
  if (state1.blocks.length !== state2.blocks.length) return true;

  // Check subject and preheader
  if (
    state1.subjectLine !== state2.subjectLine ||
    state1.preheader !== state2.preheader
  ) {
    return true;
  }

  // Check each block (shallow comparison)
  for (let i = 0; i < state1.blocks.length; i++) {
    const block1 = state1.blocks[i];
    const block2 = state2.blocks[i];

    if (
      block1.id !== block2.id ||
      block1.type !== block2.type ||
      JSON.stringify(block1.content) !== JSON.stringify(block2.content)
    ) {
      return true;
    }
  }

  return false;
}
