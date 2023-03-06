import styled from "styled-components";
import { API, KEY, IMAGE, LANGUAGE } from "../services/settings";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import NextSvgrepoCom from "../icons/next-svgrepo-com";
import BackSvgrepoCom from "../icons/back-svgrepo-com";
import { useTheme } from "../context/ThemeContext";
import SearchSvgrepoCom from "../icons/search-svgrepo-com";

const MoviesStyled = styled.div`
  grid-area: movies;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  .contenedor {
    padding-inline: 5rem;
    max-width: 1500px;
    margin: 12rem auto 2rem auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    /* grid-template-columns: repeat(auto-fill, minmax(7rem, 14rem)); */
    gap: 2rem;
  }
  .contenedor .pelicula {
    min-inline-size: 8rem;
    inline-size: 12rem;
    text-align: center;
  }
  .contenedor .pelicula .titulo {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .contenedor .pelicula .poster {
    max-width: 100%;
    margin-bottom: 10px;
    border-radius: 15px;
  }
  .paginacion {
    position: fixed;
    bottom: 0;
    background: #100a1f;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 10px;
  }

  .buttonNext {
    position: fixed;
    inset-block-start: 50%;
    inset-inline-end: 1rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .buttonBack {
    position: fixed;
    inset-block-start: 50%;
    inset-inline-start: 1rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
  form {
    text-align: center;
    position: relative;

    input {
      padding: 0;
      block-size: 2.5rem;
      padding-inline: 0.5rem;
      inline-size: 30%;
      border: none;
      border-radius: 0.5rem;
      background-color: transparent;
      border: 1px solid gray;
      box-sizing: border-box;
      font-size: 1.2rem;
      position: relative;
      background-color: rgba(255, 255, 255, 0.9);
    }
    input:focus {
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);

      outline: none;
    }
    button {
      block-size: 2.5rem;
      background-color: transparent;
      box-sizing: border-box;
      border: none;
      cursor: pointer;
      position: absolute;
      inset-inline-end: 35%;
    }
  }
  #header-container {
    padding-block: 1rem;
    display: block;
    position: relative;
    inline-size: 100vw;
    position: fixed;
    box-shadow: 0px 10px 10px -6px black;
    padding-inline: 1rem;
    box-sizing: border-box;
  }
  h1 {
    margin: 0;
    text-align: center;
    margin-block-end: 1rem;
    font-size: 3rem;
    font-family: "Phudu", cursive;
  }
  .toggle {
    position: absolute;
    inset-inline-start: 1rem;
    block-size: 100%;

    .toggle-switch {
      position: relative;
      width: 75px;
    }

    label {
      position: absolute;
      width: 100%;
      height: 40px;
      background-color: var(--dark);

      border-radius: 50px;
      cursor: pointer;
    }

    input {
      position: absolute;
      display: none;
    }

    .slider {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50px;
      transition: 0.3s;
    }

    input:checked ~ .slider {
      background-color: var(--light);
    }

    .slider::before {
      content: "";
      position: absolute;
      top: 5.4px;
      left: 6px;
      width: 28.125px;
      height: 28.125px;

      border-radius: 50%;
      box-shadow: inset 12px -4px 0px 0px var(--light);
      background-color: var(--dark);
      transition: 0.3s;
    }

    input:checked ~ .slider::before {
      transform: translateX(36.625px);
      background-color: var(--dark);
      box-shadow: none;
    }
  }

  .select-css {
    position: absolute;
    inset-inline-end: 1rem;
    inset-block-end: 1rem;
    z-index: 2;
    inline-size: 8rem;
    display: block;
    font-size: 1rem;
    font-family: "Verdana", sans-serif;
    font-weight: 400;
    color: #444;
    padding: 0.4rem 1.4rem 0.3rem 0.8rem;
    box-sizing: border-box;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
    border-radius: 0.3em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
  }
  .select-css::-ms-expand {
    display: none;
  }
  .select-css:hover {
    border-color: #888;
  }
  .select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  .select-css option {
    font-weight: normal;
  }

  .classOfElementToColor:hover {
    background-color: red;
    color: black;
  }

  .select-css option[selected] {
    background-color: orange;
  }

  @media screen and (max-width: 1200px) {
    .contenedor {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media screen and (max-width: 960px) {
    .contenedor {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 760px) {
    .contenedor {
      column-gap: 3rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const Movies = ({ categorie, setCategorie }) => {
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [pagina, setPagina] = useState(1);

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
    console.log(results);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    listMovies(searchKey);
  };
  useEffect(() => {
    setPagina(1);
    listMovies();
  }, [searchKey]);

  useLayoutEffect(() => {
    listMovies();
  }, [pagina, categorie]);

  function handleOption(event) {
    console.log(event.target.value);
    setCategorie(event.target.value);
  }

  const { toggleTheme, theme } = useTheme();

  return (
    <MoviesStyled>
      <div className={theme} id="header-container">
        <div className="toggle">
          <div className="toggle-switch">
            <label>
              <input type="checkbox" onClick={toggleTheme} />
              <span className="slider"></span>
            </label>
            <a href="https://dribbble.com/shots/14199649-Dark-Light-Mode-Toggle-Switch-Pattern-A11y"></a>
          </div>
        </div>
        <div>
          <select className="select-css" onChange={handleOption}>
            <option value={53}>Action</option>
            <option value={878}>Fiction</option>
            <option value={16}>Animation</option>
            <option value={27}>Terror</option>
            <option value={80}>Crime</option>
            <option value={12}>Adventure</option>
            <option value={35}>Comedy</option>
          </select>
        </div>

        <h1>Cinetino</h1>

        <form onSubmit={searchMovies}>
          <input
            type="text"
            placeholder="Find your movie"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button>
            <SearchSvgrepoCom />
          </button>
        </form>
      </div>
      <div className="contenedor">
        {movies
          .filter((movie) => movie.poster_path !== null)
          .map((movieF) => (
            <div key={movieF.id} className="pelicula">
              <img
                className="poster"
                src={`${IMAGE}${movieF.poster_path}`}
                alt=" "
              />
              <h3 className="titulo">{movieF.title}</h3>
            </div>
          ))}
      </div>
      <div className="contenButtons">
        <div className="buttonBack" onClick={() => setPagina(pagina - 1)}>
          <BackSvgrepoCom />
        </div>
        <div className="buttonNext" onClick={() => setPagina(pagina + 2)}>
          <NextSvgrepoCom />
        </div>
      </div>
    </MoviesStyled>
  );
};

export default Movies;
