# Hover Tiles App

A clean, standalone Electron + Svelte application featuring an infinite whiteboard with hover-revealing tiles.

## Features

- **Hover-revealing tiles**: Dark canvas with tiles that light up on hover
- **Full tldraw functionality**: Draw, add notes, shapes, text, and more
- **Zoom & pan constraints**: Limited to approximately 100x100 tile area
- **Clean UI**: Only the essential tldraw toolbar and tools
- **Native desktop app**: Runs as a standalone Electron application

## Installation

```bash
cd hover-tiles-app
npm install
```

## Development

Run the app in development mode:

```bash
npm run electron:dev
```

This will:

- Start the Vite dev server on port 5174
- Launch Electron with DevTools open
- Enable hot module replacement

## Building

Build the app for production:

```bash
npm run electron:build
```

This creates a distributable application in the `release` folder.

## Usage

### Tools Available

- **Select**: Click and drag to select and move objects
- **Hand**: Pan around the canvas
- **Draw**: Freehand drawing
- **Eraser**: Remove drawings and shapes
- **Arrow**: Draw arrows between objects
- **Text**: Add text labels
- **Note**: Add sticky notes
- **Rectangle/Ellipse/etc**: Various shapes

### Controls

- **Pan**: Click and drag with hand tool or hold spacebar
- **Zoom**: Mouse wheel (limited to 100x100 tile viewing area)
- **Hover**: Move cursor over tiles to reveal them (they light up from #333 to #555)

## Customization

Edit `src/App.svelte` to customize:

- `TILE_SIZE`: Size of each tile (default: 40)
- Tile colors: Modify the `ctx.fillStyle` values
  - Background: `#2a2a2a`
  - Default tiles: `#333`
  - Hovered tiles: `#555`
  - Tile borders: `#444`
- Zoom/pan limits: Adjust `maxVisibleTiles` and `maxPan` values

## Architecture

- `electron.cjs`: Electron main process
- `src/App.svelte`: Main Svelte component with tldraw integration
- `src/main.js`: Svelte entry point
- `vite.config.ts`: Vite build configuration
- `svelte.config.js`: Svelte compiler configuration
- `package.json`: Dependencies and scripts

**Note**: This app uses Svelte as the main framework, but tldraw is a React library. We mount tldraw using React's createRoot inside the Svelte component.

## License

MIT
