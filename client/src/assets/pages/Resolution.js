import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { NOTE_TO_DB } from '../../database/mutations';
import { SAVE_NOTE_TEXT } from '../../state/reducers/actions'
import {
     Box,
     Button,
     Textarea,
     Grid,
     Griditem,
     Container,
     Divider,
     Link
} from '@chakra-ui/react';
import { useStoreContext } from '../../state/State';

function ResolveWorkOrder() {
     const [state, dispatch] = useStoreContext();
     const [noteText, setNoteText] = useState('');
     const [partsList, setPartsList] = useState([]);
     const [saveNote, { error }] = useMutation(NOTE_TO_DB);

     const handleSaveNote = async event => {
          event.preventDefault();
          console.log(noteText);

          try {
               await saveNote(noteText);
               dispatch({
                    type: SAVE_NOTE_TEXT,
                    timestamp: Date.now()
               })
          } catch (err) {
               console.error(err);
          }

          //blank note textarea upon submit
          setNoteText('');
     }

     const handleAddParts = async event => {
          event.preventDefault();
          console.log('handle add parts');

          //Open modal of /warehouse
     }

     return (
          <Grid>
               <Container>
                    <Textarea 
                    placeholder="Add notes here"
                    value={noteText} 
                    onChange={e => setNoteText(e.target.value)}
                    />
                    <Button onClick={handleSaveNote}>
                         Save Note
                    </Button>
               </Container>
               <Divider />
                    <Button onClick={handleAddParts}>
                         Add Parts
                    </Button>

               <Divider />
                    <Link as="button" href="/invoice">
                         Invoice Work Order
                    </Link>
               
          </Grid>
     )
};

export default ResolveWorkOrder;