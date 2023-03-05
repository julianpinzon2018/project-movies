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
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  .contenedor .pelicula {
    max-inline-size: 15rem;
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

    a {
      position: relative;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      top: 56.25px;
      left: 3.75px;
      font-size: 5px;
      text-decoration: none;
      color: var(--link);
      font-weight: bold;
      text-align: center;
    }

    a:hover {
      color: var(--link-hover);
    }
  }
  .select {
    position: absolute;
    block-size: 2rem;

    border: none;
    font-size: 1rem;
    padding-inline: 0.5rem;
    border-radius: 0.25rem;
    color: black;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    inset-inline-end: 1.5rem;
  }
  .select::-ms-expand {
    display: none;
  }
  .select:hover {
    border-color: #888;
  }
  .select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  .categories {
    position: absolute;
    inset-inline-end: 2rem;
    inset-block-end: 1rem;
    display: flex;
    gap: 0.3rem;
    z-index: 2;
 
  }
  .categories div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  #genre {
    font-size: 1.2rem;
    border: none;
    border-radius: 0.25rem;
    background: none;
  }
  #genre:hover {
    transform: scale(0.9); 
    transition: 0.3s;
    cursor: pointer;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7); */
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
        <div className="categories">
          <div>
            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(53)}
            >
              Action
            </button>

            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(878)}
            >
              Fiction
            </button>

            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(16)}
            >
              Animation
            </button>
            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(27)}
            >
              Terror
            </button>
          </div>

          <div>
            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(80)}
            >
              Crime
            </button>
            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(12)}
            >
              Adventure
            </button>
            <button
              id="genre"
              className={theme}
              onClick={() => setCategorie(35)}
            >
              Comedy
            </button>
            <button id="genre" className={theme} onClick={() => setCategorie()}>
              Favorites
            </button>
          </div>
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
