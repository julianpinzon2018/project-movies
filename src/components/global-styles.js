import { createGlobalStyle } from "styled-components";

const GlobalStylesStyled = createGlobalStyle`
:root {
    --light: white;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
  font-size: 16px;
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

  #searchStyled {
       padding: 1rem;
    display: block;
    position: relative;
    inline-size: 100%;
    position: fixed;
    box-shadow: 0px 10px 10px -6px black;
    box-sizing: border-box;
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
      width: 4.6875rem;
    }
    label {
      position: absolute;
      width: 100%;
      height: 2.5rem;
      background-color: var(--dark);
      border-radius: 3.125rem;
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
      top: 0.3375rem;
      left: 0.375rem;
      width: 1.7578125rem;
      height: 1.7578125rem;

      border-radius: 50%;
      box-shadow: inset 0.75rem -4px 0px 0px var(--light);
      background-color: var(--dark);
      transition: 0.3s;
    }
    input:checked ~ .slider::before {
      transform: translateX(2.2890625rem);
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
    block-size: 2.46rem;
    display: block;
    font-size: 1rem;
    font-family: "Verdana", sans-serif;
    font-weight: 400;
    color: #444;
    padding: 0.4rem 1.4rem 0.3rem 0.8rem;
    box-sizing: border-box;
    border: 1px solid gray;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
    border-radius: 0.3em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: rgba(255, 255, 255, 0.9);
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

  }

  #moviesStyled {
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
    gap: 2rem;
    .pelicula {
        min-inline-size: 8rem;
        inline-size: 12rem;
        text-align: center;
        .titulo {
           font-size: 1.5rem;
           font-weight: 600;
         }
         .poster {
           max-width: 100%;
           margin-bottom: 10px;
           border-radius: 15px;
         }
      }
  }

.contenButtons {
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

}

  }


     @media screen and (max-width: 1200px) {
    :root {
      font-size: 14px;
    }
    #moviesStyled {
      .contenedor {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  @media screen and (max-width: 960px) {
      :root {
      font-size: 13px;
    }
    #moviesStyled {
      .contenedor {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
  @media screen and (max-width: 760px) {
    :root {
      font-size: 12px;
    }
    #moviesStyled {
      .contenedor {
        column-gap: 4rem;
        grid-template-columns: repeat(2, 1fr);
        .pelicula {
          inline-size: 14rem;
          margin: 0;
          .titulo {
            margin: 0;
          }
        }
      }
    }
#searchStyled {
  .select-css {
    inline-size: 6rem;
    padding-inline: 0.5rem;
  }
  form {
    input {
      inline-size: 45%;
      font-size: 1.2rem;
    }
    button {
      block-size: 2.5rem;
      inset-inline-end: 27%;
    }
  }
}
  }
  @media screen and (max-width: 480px) {
    :root {
      font-size: 11px;
    }

    #moviesStyled {
      .contenedor {
        column-gap: 3rem;
        .pelicula {
          inline-size: 9rem;
        }
      }
    }

    #searchStyled {
      form {
        input {
          font-size: 1.4rem;
        }
      }
    }
  }

  @media screen and (max-width: 300px) {
    :root {
      font-size: 10px;
    }

    #moviesStyled {
      .contenedor {
        column-gap: 1rem;
        .pelicula {
          inline-size: 4rem;
        }
      }
    }

    #searchStyled {
      .select-css {
        inline-size: 6rem;
      }
    }
  }


`;

export default GlobalStylesStyled;
