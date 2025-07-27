// Helper to get text position from DOM node
export const getTextPosition = (container, node, offset) => {
  let textPos = 0;
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let currentNode;
  while (currentNode = walker.nextNode()) {
    if (currentNode === node) {
      return textPos + offset;
    }
    textPos += currentNode.textContent.length;
  }
  return textPos;
};

// Get current selection in the editor
export const getCurrentSelection = (tagEditorRef) => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  
  const range = selection.getRangeAt(0);
  const editorElement = tagEditorRef.current;
  
  if (!editorElement || !editorElement.contains(range.commonAncestorContainer)) {
    return null;
  }

  // Calculate text positions
  const textContent = editorElement.textContent || '';
  const startPos = getTextPosition(editorElement, range.startContainer, range.startOffset);
  const endPos = getTextPosition(editorElement, range.endContainer, range.endOffset);
  
  if (startPos === endPos) return null;

  return {
    start: startPos,
    end: endPos,
    text: textContent.slice(startPos, endPos)
  };
};

// Get current caret position
export const getCaretPosition = (tagEditorRef) => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  
  const range = selection.getRangeAt(0);
  const editorElement = tagEditorRef.current;
  
  if (!editorElement || !editorElement.contains(range.startContainer)) {
    return null;
  }

  return getTextPosition(editorElement, range.startContainer, range.startOffset);
};