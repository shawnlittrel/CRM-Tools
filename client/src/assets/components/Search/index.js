

function Search (props) {
     const {
          searchQuery,
          setSearchQuery,
          searchCategory
     } = props;


     return (
          <form action="/" method="get">
               <label htmlFor="header-search">
                    <span className="visually-hidden">Search {searchCategory}</span>
               </label>
               <input
                    type="text"
                    id="searchbar"
                    placeholder="Search"
                    name="searchbar"
                    onChange={e => setSearchQuery(e.target.value)}
                    value={searchQuery}
               />
               <button type="submit">Search</button>
          </form>
     )
};

export default Search;