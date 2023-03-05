import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

const LayoutStyled = styled.main`
  min-block-size: 100vh;
  max-inline-size: 100vw;

  @media screen and (max-width: 768px) {
  }
`;

function Layout({ children }) {
  const { theme } = useTheme();
  return <LayoutStyled className={theme}>{children}</LayoutStyled>;
}

export default Layout;
