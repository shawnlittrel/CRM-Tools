import { useReducer } from 'react';
import {
     TOGGLE_EMPLOYEE_PUNCH,
     DISPATCH_WORK_ORDER,
     ARRIVE_WORK_ORDER,
     DEPART_WORK_ORDER,
     RESOLVE_WORK_ORDER,
     SAVE_NOTE_TEXT,
     ADD_PART_TO_STATE
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

          case SAVE_NOTE_TEXT: {
               return {
                    ...state,
                    notes: [...action.notes]
                    
               }
          }

          case ADD_PART_TO_STATE: {
               return {
                    ...state,
                    parts: [...action.parts]
               }
          }

          default:
               return state
     }
};

export function useBasicReducer(initialState) {
     return useReducer(reducer, initialState)
   };