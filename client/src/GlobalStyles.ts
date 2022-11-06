import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Outfit;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;

export default GlobalStyles;
