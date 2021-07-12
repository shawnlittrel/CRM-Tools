import { Center, Box } from "@chakra-ui/react";

function Search(props) {
  const { searchQuery, setSearchQuery, searchCategory } = props;

  return (
    <Center marginTop="10px" fontSize="lg">
      <Box borderWidth="1px" borderRadius="lg">
         <form action="/" method="get">
        <Center padding="5px">
          <label htmlFor="header-search" >
            <span className="visually-hidden">Search {searchCategory}:</span>
          </label>
        </Center>
        <input
          type="text"
          id="searchbar"
          placeholder="Search"
          name="searchbar"
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </form>
      </Box>
     
    </Center>
  );
}

export default Search;
