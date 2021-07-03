import React, { createContext, useContext } from 'react';
import { useBasicReducer } from './reducers/basicReducer';

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
     const [state, dispatch] = useBasicReducer({
          isClockedIn: false,
          isDispatched: false,
          isArrived: false,
          isDeparted: false,
          isResolved: false,
          notes: [],
          parts: []
     });

     return <Provider value={[state, dispatch]} {...props} />
};

const useStoreContext = () => {
     return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };