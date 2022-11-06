import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Outfit;
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
