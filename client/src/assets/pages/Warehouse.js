import { useState } from "react";
import { Center, Box, SimpleGrid, Button } from "@chakra-ui/react";
import Search from "../components/Search";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_WAREHOUSE_SHORT } from "../../database/queries";
import { useStoreContext } from '../../state/State'
import { ADD_PART_TO_STATE } from '../../state/reducers/actions';

function Warehouse() {
     const [state, dispatch] = useStoreContext();
  //define search area
  const { search } = window.location;
  //query warehouse list from database
  const warehouse = useQuery(QUERY_WAREHOUSE_SHORT);

  //search query is whatever is typed into searchbar
  const query = new URLSearchParams(search).get("searchbar");
  //set state of warehouse search
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filterWarehouse = (warehouse, query) => {
    //return entire list if nothing is in search bar
    if (!query) {
      return warehouse;
    }
    //adjust list based on case-insensitive text
    return warehouse.filter(product => {
      const productName = product.name.toLowerCase();
      return productName.includes(query);
    });
  };
  
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleAddProduct = async event => {
       event.preventDefault();
     setSelectedProduct(selectedProduct.push(event.target.value));

     try {
            dispatch({
          type: ADD_PART_TO_STATE,
          id: event.target.value
     });   
     } catch (err) {
          console.error(err);
     }

  }
  //TODO: add react Modal and make this handle modalClose
  const warehouseComplete = async event => {

  }
  //filter warehouse based on search text and populate on page
  const filteredWarehouse = filterWarehouse(warehouse, searchQuery);
  console.log(filteredWarehouse);
  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory="warehouse"
      />
      <Center>
      <Button
          onClick={warehouseComplete}
          >
          Finish Adding Parts
          </Button>
        <SimpleGrid>
          {filteredWarehouse.map(product => (
            <Box
              as="a"
              backgroundColor="brand.400"
              color="brand.200"
              key={product._id}
              name={product._id}
              href={`/warehouse/${product._id}`}
            >
              <Box>{product.name}</Box>
              <Box>{product.description}</Box>
              <Button value={product._id} onClick={handleAddProduct}>
                Add Part to Work Order
              </Button>
            </Box>
          ))}
        </SimpleGrid>

      </Center>
    </>
  );
}

export default Warehouse;
