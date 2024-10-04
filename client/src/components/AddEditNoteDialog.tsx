import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Note } from "../models/note";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader closeButton>
        <ModalTitle>{noteToEdit ? "Duyuruları Güncelle" : "Duyuru Ekle"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Duyuru Başlığı"
            type="text"
            placeholder="Duyuru Başlığı"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Duyuru Açıklaması"
            as="textarea"
            rows={5}
            placeholder="Duyuru Açıklaması"
            register={register}
          />
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" form="addEditNoteForm" className="w-full" disabled={isSubmitting}>
          Kaydet
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditNoteDialog;

function onNoteSaved(noteResponse: Note) {
  throw new Error("Function not implemented.");
}
