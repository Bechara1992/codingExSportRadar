import { useState } from "react";
import AddGamePopup from "../AddGamePopupComponent/AddGamePopup";
import AddGameForm from "../AddGamePopupComponent/AddGameForm";

interface IAddGameComponentProps {}
const AddGameComponent = ({}: IAddGameComponentProps) => {
  let [open, setOpen] = useState<boolean>(false);

  const closePopup = () => {
    setOpen(false);
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
      <AddGamePopup open={open} closePopup={closePopup}>
        <AddGameForm />
      </AddGamePopup>
    </section>
  );
};

export default AddGameComponent;
