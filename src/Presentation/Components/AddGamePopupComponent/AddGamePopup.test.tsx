import { render, screen, fireEvent } from "@testing-library/react";
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
  it("test form validation", async () => {
    render(<AddGameForm closePopup={mockCloseFct} submit={mockSubmitFct} />);
    const submitBtn = screen.getByTestId("formSubmitBtn");
    const homeTeamerror = screen.getByTestId("homeTeamError");
    const awayTeamerror = screen.getByTestId("awayTeamError");

    fireEvent.submit(submitBtn);
    expect(mockSubmitFct).not.toBeCalled();
    expect(homeTeamerror).toBeInTheDocument();
    expect(awayTeamerror).toBeInTheDocument();
  });

  /**
   * When both inputs are filled then submission is to be triggered,
   * no errors should be displayed
   * close popup should be called
   */

  it("test form submission", async () => {
    render(<AddGameForm closePopup={mockCloseFct} submit={mockSubmitFct} />);
    const submitBtn = screen.getByTestId("formSubmitBtn");
    const homeTeamInput = screen.getByTestId("homeTeamInput");
    fireEvent.input(homeTeamInput, {
      target: {
        value: "Germany",
      },
    });
    const awayTeamInput = screen.getByTestId("awayTeamInput");
    fireEvent.input(awayTeamInput, {
      target: {
        value: "Italy",
      },
    });
    const homeTeamError = screen.getByTestId("homeTeamError");
    const awayTeamError = screen.getByTestId("awayTeamError");

    fireEvent.submit(submitBtn);
    expect(mockSubmitFct).not.toBeCalled();
    expect(mockCloseFct).toBeCalled();
    expect(homeTeamError).not.toBeInTheDocument();
    expect(awayTeamError).not.toBeInTheDocument();
  });
});
