import Movies from "./components/movies";
import Layout from "./components/layout";
import ThemeProvider from "./context/ThemeContext";
import { useState } from "react";

function App() {
  const [categorie, setCategorie] = useState();

  return (
    <ThemeProvider>
      <Layout>
        <Movies categorie={categorie} setCategorie={setCategorie} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
