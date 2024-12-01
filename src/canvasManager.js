import { fabric } from 'fabric';

export class CanvasManager {
  constructor() {
    this.canvas = new fabric.Canvas('canvas', {
      width: window.innerWidth - 40,
      height: window.innerHeight - 200,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true,
      renderOnAddRemove: true
    });
    
    this.history = [];
    this.historyIndex = -1;
    this.isPerformingUndoRedo = false;
    this.debounceTimeout = null;
    
    this.initializeEventListeners();
    this.handleResize();
    this.saveInitialState();
  }

  initializeEventListeners() {
    // Debounced object modifications
    this.canvas.on('object:modified', () => {
      if (!this.isPerformingUndoRedo) {
        this.debounceStateChange();
      }
    });

    this.canvas.on('text:changed', () => {
      if (!this.isPerformingUndoRedo) {
        this.debounceStateChange();
      }
    });

    this.canvas.on('object:added', () => {
      if (!this.isPerformingUndoRedo) {
        this.saveState();
      }
    });

    this.canvas.on('object:removed', () => {
      if (!this.isPerformingUndoRedo) {
        this.saveState();
      }
    });

    this.canvas.on('selection:created', () => {
      this.updateToolbarState();
    });

    this.canvas.on('selection:cleared', () => {
      this.updateToolbarState();
    });

    this.canvas.on('selection:updated', () => {
      this.updateToolbarState();
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  debounceStateChange() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(() => {
      this.saveState();
    }, 300);
  }

  saveInitialState() {
    const initialState = this.canvas.toJSON();
    this.history = [JSON.stringify(initialState)];
    this.historyIndex = 0;
    this.updateUndoRedoButtons();
  }

  handleResize() {
    const container = document.querySelector('.canvas-container');
    const rect = container.getBoundingClientRect();
    const padding = 32;
    
    this.canvas.setDimensions({
      width: rect.width - padding,
      height: rect.height - padding
    });
    
    this.canvas.renderAll();
  }

  addText(text = 'New Text') {
    const center = this.canvas.getCenter();
    const fabricText = new fabric.IText(text, {
      left: center.left,
      top: center.top,
      fontSize: 20,
      fontFamily: 'Arial',
      fill: '#000000',
      originX: 'center',
      originY: 'center',
      centeredRotation: true
    });
    
    this.canvas.add(fabricText);
    this.canvas.setActiveObject(fabricText);
    fabricText.enterEditing();
    this.canvas.renderAll();
  }

  updateTextProperty(property, value) {
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      switch(property) {
        case 'bold':
          activeObject.set('fontWeight', value ? 'bold' : 'normal');
          break;
        case 'italic':
          activeObject.set('fontStyle', value ? 'italic' : 'normal');
          break;
        case 'underline':
          activeObject.set('underline', value);
          break;
        default:
          activeObject.set(property, value);
      }
      this.canvas.renderAll();
      this.saveState();
    }
  }

  updateToolbarState() {
    const activeObject = this.canvas.getActiveObject();
    const buttons = {
      bold: document.getElementById('bold'),
      italic: document.getElementById('italic'),
      underline: document.getElementById('underline')
    };
    
    Object.values(buttons).forEach(button => {
      button.classList.remove('active');
    });
    
    if (activeObject && activeObject.type === 'i-text') {
      // Update formatting buttons
      buttons.bold.classList.toggle('active', activeObject.fontWeight === 'bold');
      buttons.italic.classList.toggle('active', activeObject.fontStyle === 'italic');
      buttons.underline.classList.toggle('active', activeObject.underline);

      // Update font family
      const fontFamily = document.getElementById('fontFamily');
      fontFamily.value = activeObject.fontFamily;

      // Update font size
      const fontSize = document.getElementById('fontSize');
      fontSize.value = activeObject.fontSize;

      // Update color picker
      const colorPicker = document.getElementById('textColor');
      colorPicker.value = activeObject.fill;
    }
  }

  saveState() {
    const json = JSON.stringify(this.canvas.toJSON());
    
    // Remove future states if we're in the middle of the history
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    // Add new state and update index
    this.history.push(json);
    this.historyIndex = this.history.length - 1;
    
    // Limit history size to prevent memory issues
    if (this.history.length > 50) {
      this.history.shift();
      this.historyIndex--;
    }
    
    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyIndex > 0) {
      this.isPerformingUndoRedo = true;
      this.historyIndex--;
      this.loadState();
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.isPerformingUndoRedo = true;
      this.historyIndex++;
      this.loadState();
    }
  }

  loadState() {
    if (this.history[this.historyIndex]) {
      this.canvas.loadFromJSON(JSON.parse(this.history[this.historyIndex]), () => {
        this.canvas.renderAll();
        this.updateUndoRedoButtons();
        this.updateToolbarState();
        this.isPerformingUndoRedo = false;
      });
    }
  }

  updateUndoRedoButtons() {
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');
    
    if (undoButton && redoButton) {
      undoButton.disabled = this.historyIndex <= 0;
      redoButton.disabled = this.historyIndex >= this.history.length - 1;
    }
  }
}