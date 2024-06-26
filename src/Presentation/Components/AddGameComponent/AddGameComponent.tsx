import { useState } from "react";
import Popup from "../ReusableComponents/Popup";
import AddGameForm from "../AddGamePopupComponent/AddGameForm";
import { GameFormData } from "../../../Model/Types/GameFormData.model";

interface IAddGameComponentProps {
  createGame: (gameData: GameFormData) => void;
}
const AddGameComponent = ({ createGame }: IAddGameComponentProps) => {
  let [open, setOpen] = useState<boolean>(false);

  const closePopup = () => {
    setOpen(false);
  };

  const addnewGame = (gameData: GameFormData) => {
    createGame(gameData);
  };

  return (
    <section className="flex flex-col" data-testid="add-game">
      <div className="flex flex-row gap-4 text-lg">
        <h2 className="content-center font-bold">Available Games</h2>
        <button
          className="rounded bg-gray-200 py-2 px-4 w-fit font-bold"
          onClick={() => setOpen((prev) => !prev)}
          data-testid="add-btn"
        >
          +
        </button>
      </div>
      <Popup open={open} closePopup={closePopup}>
        <AddGameForm closePopup={closePopup} submit={addnewGame} />
      </Popup>
    </section>
  );
};

export default AddGameComponent;
