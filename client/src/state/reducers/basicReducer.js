import { useReducer } from 'react';
import {
     TOGGLE_EMPLOYEE_PUNCH,
     DISPATCH_WORK_ORDER,
     ARRIVE_WORK_ORDER,
     DEPART_WORK_ORDER,
     RESOLVE_WORK_ORDER
} from './actions';

export const reducer = (state, action) => {
     switch (action.type) {
          case TOGGLE_EMPLOYEE_PUNCH: {
               return {
                    ...state,
                    isClockedIn: (!state.isClockedIn)
               }
          }

          case DISPATCH_WORK_ORDER: {
               return {
                    ...state,
                    isDispatched: true
               }
          }

          case ARRIVE_WORK_ORDER: {
               return {
                    ...state,
                    isArrived: true
               }
          }

          case DEPART_WORK_ORDER: {
               return {
                    ...state,
                    isDeparted: true
               }
          }

          case RESOLVE_WORK_ORDER: {
               return {
                    ...state,
                    isResolved: true
               }
          }

          default:
               return state
     }
};

export function useBasicReducer(initialState) {
     return useReducer(reducer, initialState)
   };