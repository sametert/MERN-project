import { Button, Form, FormControl, FormGroup, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Note } from "../models/note";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved} : AddEditNoteDialogProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
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
                    {noteToEdit ? "Edit Note" : "Add Note"}
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
     );
}
 
export default AddEditNoteDialog;

function onNoteSaved(noteResponse: Note) {
    throw new Error("Function not implemented.");
}