import { reducer } from '../state/reducers/basicReducer';
import {
     TOGGLE_EMPLOYEE_PUNCH,
     DISPATCH_WORK_ORDER,
     ARRIVE_WORK_ORDER,
     DEPART_WORK_ORDER,
     RESOLVE_WORK_ORDER,
     ADD_PART_TO_STATE,
     SAVE_NOTE_TEXT,
     CLEAR_NOTES_ON_RESOLVE
} from '../state/reducers/actions';

const initialState = {
     isClockedIn: false,
     isDispatched: false,
     isArrived: false,
     isDeparted: false,
     isResolved: false,
     notes: [],
     parts: []
};


test('CLOCK_IN/OUT', () => {
     let newState = reducer(initialState, {
          type: TOGGLE_EMPLOYEE_PUNCH
     });

     expect(newState.isClockedIn).toBe(true);
     expect(initialState.isClockedIn).toBe(false);

     let newState1 = reducer(newState, {
          type: TOGGLE_EMPLOYEE_PUNCH
     });

     expect(newState1.isClockedIn).toBe(false);
});

test('DISPATCH_WORK_ORDER', () => {
     let newState = reducer(initialState, {
          type: DISPATCH_WORK_ORDER
     });

     expect(newState.isDispatched).toBe(true);
     expect(initialState.isDispatched).toBe(false);
});

test('ARRIVE_WORK_ORDER', () => {
     let newState = reducer(initialState, {
          type: ARRIVE_WORK_ORDER
     });

     expect(newState.isArrived).toBe(true);
     expect(initialState.isArrived).toBe(false);
});

test('DEPART_WORK_ORDER', () => {
     let newState = reducer(initialState, {
          type: DEPART_WORK_ORDER
     });

     expect(newState.isDeparted).toBe(true);
     expect(initialState.isDeparted).toBe(false);
});

test('RESOLVE_WORK_ORDER', () => {
     let newState = reducer(initialState, {
          type: RESOLVE_WORK_ORDER
     });

     expect(newState.isResolved).toBe(true);
     expect(initialState.isResolved).toBe(false);
});

test('SAVE_NOTE_TEXT', () => {
     let newState = reducer(initialState, {
          type: SAVE_NOTE_TEXT,
          notes: ['1', '2']
     });

     //confirm notes are added to state
     expect(newState.notes.length).toBe(2);
     expect(initialState.notes.length).toBe(0);

     //match text entries in array
     expect(newState.notes[0]).toBe('1');
     expect(newState.notes[1]).toBe('2');
});

test('ADD_PART_TO_STATE', () => {
     let newState = reducer(initialState, {
          type: ADD_PART_TO_STATE,
          parts: [
               {
                    _id: '1',
                    name: 'test1',
                    description: 'some text'
               },
               {}
          ]
     });

          //make sure new parts are pushed to state
     expect(newState.parts.length).toBe(2);
     expect(initialState.parts.length).toBe(0);

     //ensure proper fields are populated
     expect(newState.parts[0]._id).toBe('1');
     expect(newState.parts[0].name).toBe('test1');
     expect(newState.parts[0].description).toBe('some text');
});