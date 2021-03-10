const Search = ({ onClick }) => {
  return (
    <div onClick={onClick} className="search-container">
      <img src="search.png" alt="" />
      <p> Search movie </p>
    </div>
  );
};

export default Search;
