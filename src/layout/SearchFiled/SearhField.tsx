import { SetStateAction, useState } from "react";
import "./SearchField.scss";
import { Search, X } from "lucide-react";

export default function SearchField() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <form
      className="search-form"
      autoComplete="off"
      data-testid="search-form"
    >
      <div className="search-input">
        <input
          type="search"
          name="Header search input"
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
        />

        {searchValue && (
          <button
            type="button"
            className="icon-close"
            data-testid="clear-search-button"
            aria-label="Clear search"
            onClick={clearSearch}
          >
            <X size={20} aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          className="icon-search"
          aria-label="Search"
          data-testid="search-button"
        >
          <Search size={20} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
