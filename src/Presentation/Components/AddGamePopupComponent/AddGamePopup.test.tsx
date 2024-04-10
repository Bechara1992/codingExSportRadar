import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddGameForm from "./AddGameForm";
import { GameFormData } from "../../../Model/Types/GameFormData.model";

/**
 * The form will consist of 2 inputs to get the home and away team names
 * and create a new game, a cancel button and a submit button
 * the 2 inputs are of text inputs and should required.
 * In case one or the other inputs are unfilled errors should be displayed.
 */

const mockSubmitFct = jest.fn((gameData: GameFormData) => {});
const mockCloseFct = jest.fn(() => {});

const mockedSubmittedData = {
  homeTeam: "Germany",
  awayTeam: "Italy",
};

describe("add game popup", () => {
  test("check form is loaded", () => {
    render(<AddGameForm closePopup={mockCloseFct} submit={mockSubmitFct} />);
    expect(screen.getByTestId("add-game-form")).toBeInTheDocument();
  });
});

describe("add game form", () => {
  /**
   * Submit function should not be called, and error messages
   * should be displayed
   */
  test("test form validation", async () => {
    render(<AddGameForm closePopup={mockCloseFct} submit={mockSubmitFct} />);
    const submitBtn = screen.getByTestId("formSubmitBtn");

    await fireEvent.submit(submitBtn);
    expect(mockSubmitFct).not.toBeCalled();

    await waitFor(() => {
      expect(screen.queryByTestId("homeTeamError")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId("awayTeamError")).toBeInTheDocument();
    });
  });

  /**
   * When both inputs are filled then submission is to be triggered,
   * no errors should be displayed
   * close popup should be called
   */

  test("test form submission", async () => {
    render(<AddGameForm closePopup={mockCloseFct} submit={mockSubmitFct} />);
    const submitBtn = screen.getByTestId("formSubmitBtn");

    // Populate homeTeam input and check its value
    const homeTeamInput = screen.getByTestId("homeTeamInput");
    await fireEvent.input(homeTeamInput, {
      target: {
        value: "Germany",
      },
    });
    expect(homeTeamInput).toHaveValue("Germany");

    // Populate awayTeam input and check its value
    const awayTeamInput = screen.getByTestId("awayTeamInput");
    await fireEvent.input(awayTeamInput, {
      target: {
        value: "Italy",
      },
    });
    expect(awayTeamInput).toHaveValue("Italy");

    await fireEvent.submit(submitBtn);

    // Check if submit is called and no errors are present
    await waitFor(() =>
      expect(mockSubmitFct).toBeCalledWith(mockedSubmittedData)
    );
    expect(mockCloseFct).toBeCalled();
    expect(screen.queryByTestId("homeTeamError")).not.toBeInTheDocument();
    expect(screen.queryByTestId("awayTeamError")).not.toBeInTheDocument();
  });

  test("test cancel button", () => {
    render(<AddGameForm closePopup={mockCloseFct} submit={mockSubmitFct} />);
    const cancelBtn = screen.getByTestId("cancelBtn");
    fireEvent.click(cancelBtn);
    expect(mockCloseFct).toBeCalled();
  });
});
