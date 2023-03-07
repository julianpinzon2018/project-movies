import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import { useContext } from "react";
import { LogicContext } from "../context/LogicContext";
import SearchSvgrepoCom from "../icons/search-svgrepo-com";

const SearchStyled = styled.div``;

function Search() {
  const { toggleTheme, theme } = useTheme();
  const { searchKey, setSearchKey, listMovies, setCategorie } =
    useContext(LogicContext);

  const searchMovies = (e) => {
    e.preventDefault();
    listMovies(searchKey);
  };
  function handleOption(event) {
    setCategorie(event.target.value);
  }

  return (
    <SearchStyled id="searchStyled">
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
          <option value="">Favorites</option>
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
          placeholder="search"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button>
          <SearchSvgrepoCom className="search" />
        </button>
      </form>
    </SearchStyled>
  );
}

export default Search;
