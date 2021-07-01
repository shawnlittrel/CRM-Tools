import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { NOTE_TO_DB } from "../../database/mutations";
import { SAVE_NOTE_TEXT } from "../../state/reducers/actions";
import Modal from "react-modal";
import Warehouse from "../pages/Warehouse";
import {
  Box,
  Button,
  Textarea,
  Grid,
  Griditem,
  Container,
  Divider,
  Link,
  Flex,
  Spacer
} from "@chakra-ui/react";
import { useStoreContext } from "../../state/State";

function ResolveWorkOrder() {
  const [state, dispatch] = useStoreContext();
  const [noteText, setNoteText] = useState("");
  const [saveNote, { error }] = useMutation(NOTE_TO_DB);
  const [partsModalIsOpen, setPartsModalIsOpen] = useState(false);

  const handleSaveNote = async event => {
    event.preventDefault();
    console.log(noteText);

    try {
      await saveNote(noteText);
      dispatch({
        type: SAVE_NOTE_TEXT,
        timestamp: Date.now()
      });
    } catch (err) {
      console.error(err);
    }

    //blank note textarea upon submit
    setNoteText("");
  };

  const handleAddParts = async event => {
    event.preventDefault();
    console.log("handle add parts");
    //Open modal of /warehouse
    setIsOpen(true);
  };

  const closePartsModal = () => {
    setPartsModalIsOpen(false);
  };

  const handleClosePartsModal = async event => {
    event.preventDefault();
    setPartsModalIsOpen(false);
    //TODO: map saved parts on work order
  };


  return (
    <Grid>
      <Container>
        <Textarea
          placeholder="Add notes here"
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
        />
        <Button onClick={handleSaveNote}>Save Note</Button>
      </Container>
      <Divider />
      <Button onClick={handleAddParts}>Add Parts</Button>
      <Modal
        isOpen={partsModalIsOpen}
        onRequestClose={closePartsModal}
        key={`partsModal`}
      >
        <Flex>
          <Button
            onClick={closePartsModal}
            aria-label="Close"
            key="modalClose"
            backgroundColor="tomato"
            color="white"
          >
            CANCEL
          </Button>
          <Spacer />
          <Button
            onClick={handleClosePartsModal}
            aria-label="Save"
            key="modalSave"
            backgroundColor="brand.400"
            color="color.200"
          >
            Save to Workorder
          </Button>
        </Flex>
        <Divider />
        <Warehouse />
      </Modal>
      <Divider />

      <Button
          onClick={handleInvoice}
     >
          Invoice Work Order
     </Button>
    </Grid>
  );
}

export default ResolveWorkOrder;
