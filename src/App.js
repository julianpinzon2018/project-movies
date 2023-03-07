import Movies from "./components/movies";
import Layout from "./components/layout";
import ThemeProvider from "./context/ThemeContext";
import Header from "./components/header";
import LogicContextProvider from "./context/LogicContext";

function App() {
  return (
    <ThemeProvider>
      <LogicContextProvider>
        <Layout>
          <Header />
          <Movies />
        </Layout>
      </LogicContextProvider>
    </ThemeProvider>
  );
}

export default App;
