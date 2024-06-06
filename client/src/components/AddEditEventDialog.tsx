import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { EventInput } from "../network/notes_api";
import * as EventApi from "../network/notes_api";
import { Event } from "../models/event";
import TextInputField from "./form/TextInputField";

interface AddEditEventDialogProps {
  eventToEdit?: Event;
  onDismiss: () => void;
  onEventSaved: (event: Event) => void;
}

const AddEditEventDialog = ({
  eventToEdit,
  onDismiss,
  onEventSaved,
}: AddEditEventDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventInput>({
    defaultValues: {
      title: eventToEdit?.title || "",
      text: eventToEdit?.text || "",
    },
  });

  async function onSubmit(input: EventInput) {
    try {
      let eventResponse: Event;
      if (eventToEdit) {
        eventResponse = await EventApi.updateEvent(eventToEdit._id, input);
      } else {
        eventResponse = await EventApi.createEvent(input);
      }
      onEventSaved(eventResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader closeButton>
        <ModalTitle>{eventToEdit ? "Etkinliği Güncelle" : "Etkinlik Ekle"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form id="addEditEventForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Etkinlik Başlığı"
            type="text"
            placeholder="Etkinlik Başlığı"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputField
            name="text"
            label="Etkinlik Açıklaması"
            as="textarea"
            rows={5}
            placeholder="Etkinlik Açıklaması"
            register={register}
          />
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" form="addEditEventForm" className="w-full" disabled={isSubmitting}>
          Kaydet
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditEventDialog;

function onEventSaved(noteResponse: Event) {
  throw new Error("Function not implemented.");
}
