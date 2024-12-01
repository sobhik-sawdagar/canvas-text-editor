import { CanvasManager } from './src/canvasManager.js';
import { setupEventHandlers } from './src/eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvasManager = new CanvasManager();
  setupEventHandlers(canvasManager);
});