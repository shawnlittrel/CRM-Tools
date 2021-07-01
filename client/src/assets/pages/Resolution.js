import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
     Box,
     Button,
     Textarea,
     Grid,
     Griditem,
     Container
} from '@chakra-ui/react';
import { useStoreContext } from '../../state/State';

function ResolveWorkOrder() {
     const [noteText, setNoteText] = useState('');
     const [partsList, setPartsList] = useState([]);

     const handleSaveNote = async event => {
          event.preventDefault();
          console.log(noteText);

          setNoteText('');
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
          </Grid>
     )
};

export default ResolveWorkOrder;