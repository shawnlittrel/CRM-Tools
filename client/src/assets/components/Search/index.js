

function Search (props) {
     return (
          <form action="/" method="get">
               <label htmlFor="header-search">
                    <span className="visually-hidden">Search {props}</span>
               </label>
               <input
                    type="text"
                    id="searchbar"
                    placeholder="Search"
                    name="searchbar"
               />
               <button type="submit">Search</button>
          </form>
     )
};

export default Search;