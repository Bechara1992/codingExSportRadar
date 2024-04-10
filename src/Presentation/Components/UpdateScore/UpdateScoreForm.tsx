import { ScoreUpdateModel } from "../../../Model/Types/ScoreUpdate.model";
import { useForm, SubmitHandler } from "react-hook-form";

interface IUpdateScoreFormProps {
  closePopup: () => void;
  submit: (scoreParams: ScoreUpdateModel, id: string | null) => void;
  id: string | null;
}

const UpdateScoreForm = ({ closePopup, submit, id }: IUpdateScoreFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScoreUpdateModel>();

  const onSubmit: SubmitHandler<ScoreUpdateModel> = (data) => {
    submit(data, id);
    resetAndClose();
  };

  const resetAndClose = () => {
    reset();
    closePopup();
  };
  return (
    <form data-testid="update-score-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Create a match
            </h3>
            <div className="mt-2 flex flex-col gap-4">
              <input
                className="border border-black rounded p-2"
                placeholder="Home"
                type="number"
                data-testid={`homeInput`}
                {...register("home", {
                  required: true,
                  pattern: {
                    value: /^([+-]?[1-9]\d*|0)$/,
                    message: "Can only be integer",
                  },
                })}
              />
              {errors.home && (
                <span data-testid="homeError" className="text-red-600 text-sm">
                  {errors.home.message}
                </span>
              )}

              <input
                className="border border-black rounded p-2"
                placeholder="Guest"
                type="number"
                data-testid={`awayInput`}
                {...register("away", {
                  required: true,
                  pattern: {
                    value: /^([+-]?[1-9]\d*|0)$/,
                    message: "Can only be integer",
                  },
                })}
              />
              {errors.away && (
                <span data-testid="awayError" className="text-red-600 text-sm">
                  {errors.away.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          data-testid="formSubmitBtn"
        >
          Change Score
        </button>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={resetAndClose}
          data-testid="cancelBtn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateScoreForm;
