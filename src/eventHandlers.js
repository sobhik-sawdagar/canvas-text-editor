export function setupEventHandlers(canvasManager) {
  // Add Text Button
  document.getElementById('addText').addEventListener('click', () => {
    canvasManager.addText();
  });

  // Font Family
  document.getElementById('fontFamily').addEventListener('change', (e) => {
    canvasManager.updateTextProperty('fontFamily', e.target.value);
  });

  // Font Size
  document.getElementById('fontSize').addEventListener('change', (e) => {
    canvasManager.updateTextProperty('fontSize', parseInt(e.target.value));
  });

  // Text Formatting
  document.getElementById('bold').addEventListener('click', (e) => {
    const isActive = e.currentTarget.classList.toggle('active');
    canvasManager.updateTextProperty('bold', isActive);
  });

  document.getElementById('italic').addEventListener('click', (e) => {
    const isActive = e.currentTarget.classList.toggle('active');
    canvasManager.updateTextProperty('italic', isActive);
  });

  document.getElementById('underline').addEventListener('click', (e) => {
    const isActive = e.currentTarget.classList.toggle('active');
    canvasManager.updateTextProperty('underline', isActive);
  });

  // Text Color
  document.getElementById('textColor').addEventListener('input', (e) => {
    canvasManager.updateTextProperty('fill', e.target.value);
  });

  // Undo Button
  document.getElementById('undo').addEventListener('click', () => {
    canvasManager.undo();
  });

  // Redo Button
  document.getElementById('redo').addEventListener('click', () => {
    canvasManager.redo();
  });
}