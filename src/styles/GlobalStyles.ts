import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Global Resets and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #fff;
    color: #000;
  }

  input, button {
    outline: none;
  }

  /* Custom Styles */

  @layer components {
    .preferenceBtn {
      position: relative;
      border-radius: 0.375rem;
      padding: 0.375rem 0.75rem;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      transition: all 0.3s;
      margin-left: auto;
      padding: 0.25rem;
      margin-right: 0.5rem;
      &:hover {
        background-color: #333333;
      }
    }

    .preferenceBtn-tooltip {
      position: absolute;
      padding: 0.5rem;
      font-size: 0.875rem;
      margin: 0.5rem;
      min-width: max-content;
      transform: translateX(0.75rem);
      right: 0;
      top: 1.25rem;
      z-index: 10;
      border-radius: 0.375rem;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      background-color: #e2e8f0;
      color: #1a202c;
      transform-origin: center;
      scale: 0;
      transition: all 0.1s linear;
      &:hover {
        scale: 1;
      }
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background: #282828;
  }

  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
  }

  /* Code Editor */
  .cm-scroller, .cm-gutters {
    background-color: #282828 !important;
  }

  .cm-focused {
    outline: none !important;
  }

  .split {
    display: flex;
    flex-direction: row;
  }

  .gutter {
    background-color: rgb(26, 26, 26);
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .gutter:hover {
    background-color: #0a84ff;
  }

  .gutter.gutter-horizontal {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
    cursor: col-resize;
  }

  .gutter.gutter-vertical {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
    cursor: row-resize;
  }

  code {
    border-radius: 0.3125rem;
    border-width: 1px;
    font-family: sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    padding: 0.125rem;
    letter-spacing: 1px;
    white-space: pre-wrap;
    background-color: hsla(0, 0%, 100%, 0.07);
    border-color: rgba(247, 250, 255, 0.12);
    color: rgba(239, 241, 246, 0.75);
  }

  .example-card pre {
    background-color: hsla(0, 0%, 100%, 0.1);
    border-radius: 0.5rem;
    color: rgba(239, 241, 246, 0.75);
    font-size: 0.98rem;
    line-height: 1.25rem;
    margin: 1rem 0;
    padding: 1rem;
    white-space: pre-wrap;
  }

  .example-card pre strong {
    color: white;
    font-size: 1rem;
  }
`;
