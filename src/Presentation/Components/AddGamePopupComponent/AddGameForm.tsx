import { GameFormData } from "../../../Model/Types/GameFormData.model";

interface IAddGameFormProps {
  closePopup: () => void;
  submit: (gameParams: GameFormData) => void;
}
const AddGameForm = ({ closePopup, submit }: IAddGameFormProps) => {
  return <form data-testid="add-game-form"></form>;
};

export default AddGameForm;
