import styled from "styled-components";
import { IMAGE } from "../services/settings";
import { useEffect, useLayoutEffect } from "react";
import NextSvgrepoCom from "../icons/next-svgrepo-com";
import BackSvgrepoCom from "../icons/back-svgrepo-com";
import { LogicContext } from "../context/LogicContext";
import { useContext } from "react";

const MoviesStyled = styled.div``;

const Movies = () => {
  const { movies, searchKey, listMovies, categorie, pagina, setPagina } =
    useContext(LogicContext);

  useEffect(() => {
    listMovies();
  }, [searchKey]);

  useLayoutEffect(() => {
    listMovies();
  }, [pagina, categorie]);

  return (
    <MoviesStyled id="moviesStyled">
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
