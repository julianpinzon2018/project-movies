import { createGlobalStyle } from "styled-components";

const GlobalStylesStyled = createGlobalStyle`
:root {
    --light: white;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
}

body {
  margin: 0;
}
.darko {
background: -webkit-linear-gradient(360deg,#224e4d 10%,#083023 360%); background: linear-gradient(360deg,#224e4d 10%,#083023 360%);
  color: #ffe; 
}

.lighto {
background: -webkit-linear-gradient(360deg,#e9fbcf 10%,#1d7d8e 360%); background: linear-gradient(360deg,#e9fbcf 10%,#1d7d8e 360%);
  color: #002;
}



`;

export default GlobalStylesStyled;
