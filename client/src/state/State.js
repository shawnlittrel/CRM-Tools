import React, { createContext, useContext } from 'react';
import { useBasicReducer } from './reducers/basicReducer';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
     const [state, dispatch] = useBasicReducer({
          //general - Not sure these need to be managed by global state, can be accessed by db queries and mutations
          employees: [],
          clients: [],
          //employee
          isClockedIn: false,
          //workOrders
          isDispatched: false,
          isArrived: false,
          isDeparted: false,
          isResolved: false
     });

     return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => {
     return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };