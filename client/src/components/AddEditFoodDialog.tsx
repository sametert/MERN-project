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
import { FoodInput } from "../network/notes_api";
import * as FoodApi from "../network/notes_api";
import { Food } from "../models/food";

interface AddEditFoodDialogProps {
  foodToEdit?: Food;
  onDismiss: () => void;
  onFoodSaved: (food: Food) => void;
}

const AddEditFoodDialog = ({
  foodToEdit,
  onDismiss,
  onFoodSaved,
}: AddEditFoodDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FoodInput>({
    defaultValues: {
      day: foodToEdit?.day || "",
      foodName: foodToEdit?.foodName || "",
    },
  });

  async function onSubmit(input: FoodInput) {
    try {
      let foodResponse: Food;
      if (foodToEdit) {
        foodResponse = await FoodApi.updateFood(foodToEdit._id, input);
      } else {
        foodResponse = await FoodApi.createFood(input);
      }
      onFoodSaved(foodResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <ModalHeader closeButton>
        <ModalTitle>{foodToEdit ? "Yemek Menüsünü Güncelle" : "Yemek Menüsü Ekle"}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form id="addEditFoodForm" onSubmit={handleSubmit(onSubmit)}>
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
            <FormLabel>Yemek İsmi</FormLabel>
            <FormControl
              type="text"
              placeholder="Yemek İsmi"
              isInvalid={!!errors.foodName}
              {...register("foodName", { required: "Required" })}
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" form="addEditFoodForm" className="w-full" disabled={isSubmitting}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditFoodDialog;

function onFoodSaved(noteResponse: Food) {
  throw new Error("Function not implemented.");
}
