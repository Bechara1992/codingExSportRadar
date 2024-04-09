import { fireEvent, render, screen } from "@testing-library/react";
import AddGameComponent from "./AddGameComponent";

/**
 * The component should consist of a title with a button.
 * When the button is clicked it will open a popup with a form.
 * When filled the form should then fire a callback function and send the
 * filled data back to the main layout, clear the form then exit.
 */

describe("Add Game", () => {
  render(<AddGameComponent />);
  test("check add game component is mounted", () => {
    expect(screen.getByTestId("add-game")).toBeInTheDocument();
  });

  test("test add game button functionality", () => {
    render(<AddGameComponent />);

    const addButton = screen.getByTestId("add-btn");
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const dialog = screen.getByTestId("create-game");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("open");
  });
});
