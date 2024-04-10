import { ScoreUpdateModel } from "../../../Model/Types/ScoreUpdate.model";

interface IUpdateScoreFormProps {
  closePopup: () => void;
  submit: (scoreParams: ScoreUpdateModel, id: string | null) => void;
  id: string | null;
}

const UpdateScoreForm = ({}: IUpdateScoreFormProps) => {
  return <div></div>;
};

export default UpdateScoreForm;
