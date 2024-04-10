import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateScoreForm from "./UpdateScoreForm";
import { ScoreUpdateModel } from "../../../Model/Types/ScoreUpdate.model";

/**
 * The form will consist of 2 inputs to get the home and away team names
 * and create a new game, a cancel button and a submit button
 * the 2 inputs are of text inputs and should required.
 * In case one or the other inputs are unfilled errors should be displayed.
 */

const mockSubmitFct = jest.fn((scoreData: ScoreUpdateModel) => {});
const mockCloseFct = jest.fn(() => {});

const mockedSubmittedData = {
  home: 2,
  away: 1,
};

describe("update score popup", () => {
  test("check form is loaded", () => {
    render(
      <UpdateScoreForm
        closePopup={mockCloseFct}
        submit={mockSubmitFct}
        id="f6fd7cd5-24f5-499a-ba3b-599955d1bab1"
      />
    );
    expect(screen.getByTestId("update-score-form")).toBeInTheDocument();
  });
});

describe("update score form", () => {
  /**
   * Submit function should not be called, and error messages
   * should be displayed
   */
  test("test form validation", async () => {
    render(
      <UpdateScoreForm
        closePopup={mockCloseFct}
        submit={mockSubmitFct}
        id="f6fd7cd5-24f5-499a-ba3b-599955d1bab1"
      />
    );
    const submitBtn = screen.getByTestId("formSubmitBtn");

    await fireEvent.submit(submitBtn);
    expect(mockSubmitFct).not.toBeCalled();

    await waitFor(() => {
      expect(screen.queryByTestId("homeError")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId("awayError")).toBeInTheDocument();
    });
  });

  /**
   * When both inputs are filled then submission is to be triggered,
   * no errors should be displayed
   * close popup should be called
   */

  test("test form submission", async () => {
    render(
      <UpdateScoreForm
        closePopup={mockCloseFct}
        submit={mockSubmitFct}
        id="f6fd7cd5-24f5-499a-ba3b-599955d1bab1"
      />
    );
    const submitBtn = screen.getByTestId("formSubmitBtn");

    // Populate homeTeam input and check its value
    const homeInput = screen.getByTestId("homeInput");
    await fireEvent.input(homeInput, {
      target: {
        value: 3,
      },
    });
    expect(homeInput).toHaveValue(3);

    // Populate awayTeam input and check its value
    const awayInput = screen.getByTestId("awayInput");
    await fireEvent.input(awayInput, {
      target: {
        value: 2,
      },
    });
    expect(awayInput).toHaveValue(2);

    await fireEvent.submit(submitBtn);

    // Check if submit is called and no errors are present
    await waitFor(() => expect(mockSubmitFct).toBeCalled());
    expect(mockCloseFct).toBeCalled();
    expect(screen.queryByTestId("homeError")).not.toBeInTheDocument();
    expect(screen.queryByTestId("awayError")).not.toBeInTheDocument();
  });

  test("test cancel button", () => {
    render(
      <UpdateScoreForm
        closePopup={mockCloseFct}
        submit={mockSubmitFct}
        id="f6fd7cd5-24f5-499a-ba3b-599955d1bab1"
      />
    );
    const cancelBtn = screen.getByTestId("cancelBtn");
    fireEvent.click(cancelBtn);
    expect(mockCloseFct).toBeCalled();
  });
});
