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
import { LessonInput } from "../../network/notes_api";
import * as LessonApi from "../../network/notes_api";
import { Lesson } from "../../models/lesson";

interface AddEditLessonDialogProps {
  lessonToEdit?: Lesson;
  onDismiss: () => void;
  onLessonSaved: (lesson: Lesson) => void;
}

const AddEditLessonDialog = ({
  lessonToEdit,
  onDismiss,
  onLessonSaved,
}: AddEditLessonDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LessonInput>({
    defaultValues: {
      day: lessonToEdit?.day || "",
      lessonName: lessonToEdit?.lessonName || "",
      hour: lessonToEdit?.hour || "",
    },
  });

  async function onSubmit(input: LessonInput) {
    try {
      let lessonResponse: Lesson;
      if (lessonToEdit) {
        lessonResponse = await LessonApi.updateLesson(lessonToEdit._id, input);
      } else {
        lessonResponse = await LessonApi.createLesson(input);
      }
      onLessonSaved(lessonResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader closeButton>
        <ModalTitle>{lessonToEdit ? "Dersi Güncelle" : "Ders Ekle"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form id="addEditLessonForm" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="mb-3">
            <FormLabel>Gün</FormLabel>
            <FormControl
              type="text"
              placeholder="Gün"
              isInvalid={!!errors.day}
              {...register("day", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.day?.message}
            </Form.Control.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Dersin İsmi</FormLabel>
            <FormControl
              type="text"
              placeholder="Dersin İsmi"
              isInvalid={!!errors.lessonName}
              {...register("lessonName", { required: "Required" })}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Saat</FormLabel>
            <FormControl
              type="text"
              placeholder="Saat"
              isInvalid={!!errors.hour}
              {...register("hour", { required: "Required" })}
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" form="addEditLessonForm" className="w-full" disabled={isSubmitting}>
          Kaydet
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditLessonDialog;

function onLessonSaved(noteResponse: Lesson) {
  throw new Error("Function not implemented.");
}
