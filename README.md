# Canvas Text Editor

A powerful and intuitive text editor built with HTML5 Canvas technology. This project allows users to create, edit, and manipulate text elements on a canvas with a modern and user-friendly interface.

## 🌐Live Demo

[View Live Application](https://canvas-text-editor-beta.vercel.app/)

## Features

- Add and edit text anywhere on the canvas
- Drag and drop text elements
- Rich text formatting options:
  - Multiple font families
  - Font size adjustment
  - Bold, italic, and underline formatting
  - Text colour customization
- Undo/Redo functionality
- Responsive design
- Intuitive user interface
- State management for text modifications

## Technologies Used

- HTML5 Canvas
- Fabric.js - Canvas manipulation library
- Vanilla JavaScript (ES6+)
- CSS3 with modern features
- Material Design Icons
- Google Fonts
- Vite - Frontend build tool

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sobhik-sawdagar/canvas-text-editor.git
cd canvas-text-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local server URL provided by Vite (typically `http://localhost:5173`)


## Usage

1. **Adding Text**
   - Click the "Add Text" button to create a new text element
   - Click on the canvas to place the text
   - Double-click text to edit

2. **Formatting Text**
   - Select text to modify
   - Use the toolbar options to:
     - Change the font family
     - Adjust font size
     - Apply bold, italic, or underline
     - Change the text colour

3. **Moving Text**
   - Click and drag text elements to reposition
   - Use selection handles to resize

4. **Undo/Redo**
   - Click the undo/redo buttons in the top toolbar
   - Or use keyboard shortcuts (Ctrl/Cmd + Z for undo, Ctrl/Cmd + Y for redo)

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## License

This is an open-source project
