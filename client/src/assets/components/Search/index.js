import { Center, Button } from "@chakra-ui/react";

function Search(props) {
  const { searchQuery, setSearchQuery, searchCategory } = props;

  return (
    <Center>
      <form action="/" method="get">
        <Center>
          <label htmlFor="header-search">
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
        <Button type="submit" backgroundColor="brand.400" color="brand.200">
          Search
        </Button>
      </form>
    </Center>
  );
}

export default Search;
