import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Note } from "../models/note";

interface AddNoteDialogProps {
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

const AddNoteDialog = ({ onDismiss, onNoteSaved} : AddNoteDialogProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>();

    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = await NotesApi.createNote(input);
            onNoteSaved(noteResponse)
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }


    return ( 
        <Modal show onHide={onDismiss}>
            <ModalHeader closeButton>
                <ModalTitle>
                    Add Note
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl 
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title" , {required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <FormLabel>Text</FormLabel>
                        <FormControl 
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
     );
}
 
export default AddNoteDialog;

function onNoteSaved(noteResponse: Note) {
    throw new Error("Function not implemented.");
}