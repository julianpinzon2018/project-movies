import { createContext, useState } from "react";
import axios from "axios";
const API = "https://api.themoviedb.org/3";
const KEY = "c38df950508685c21f65364e0970650f";
const LANGUAGE = "en-US";
const IMAGE = "https://image.tmdb.org/t/p/w500/";

export const LogicContext = createContext();

const LogicContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pagina, setPagina] = useState(1);
  const [categorie, setCategorie] = useState();

  const listMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    if (searchKey) {
      setPagina(1);
    }

    const {
      data: { results },
    } = await axios.get(`${API}/${type}/movie`, {
      params: {
        api_key: KEY,
        query: searchKey,
        language: LANGUAGE,
        page: pagina,
        with_genres: categorie,
      },
    });

    setMovies(results);
    // console.log(results);
  };

  const data = {
    movies,
    setMovies,
    searchKey,
    setSearchKey,
    listMovies,
    categorie,
    setCategorie,
    pagina,
    setPagina,
    IMAGE,
  };
  return <LogicContext.Provider value={data}>{children}</LogicContext.Provider>;
};

export default LogicContextProvider;
