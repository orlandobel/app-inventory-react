import React from "react";

interface SearchFormProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  isSearchMode: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  onSearchTermChange,
  onSubmit,
  onClear,
  isSearchMode
}) => {
  return (
    <form onSubmit={onSubmit} className="dashboard__search-form">
      <input
        type="text"
        placeholder="Buscar por nombre o SKU..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="dashboard__search-input"
      />
      <button type="submit" className="dashboard__search-button">
        Buscar
      </button>
      {isSearchMode && (
        <button 
          type="button" 
          onClick={onClear}
          className="dashboard__clear-button"
        >
          Limpiar
        </button>
      )}
    </form>
  );
};

export default SearchForm;