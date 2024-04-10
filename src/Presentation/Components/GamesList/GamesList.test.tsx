import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react";
import GamesListItem from "./GamesListItem";
import { GamesListMockData } from "../../../Logic/MockData/GamesMockData";
import ResizeObserver from "resize-observer-polyfill";
import { ScoreUpdateModel } from "../../../Model/Types/ScoreUpdate.model";
import GamesList from "./GamesList";

afterEach(cleanup);

window.ResizeObserver = ResizeObserver;

const mockOpenUpdateScoreFormFct = jest.fn((id: string) => {});
const mockEndGameFct = jest.fn((id: string) => {});

/**
 * The list should display all the games in the desired order.
 * Higher "total" score on top, and newer game on top in case
 * of identical scores.
 * Each list Item should display both teams' name and score,
 * in addition to 2 buttons one to change the score,
 * and another one to end the game.
 */

describe("test games list", () => {
  test("test list item displaying correct elements", () => {
    render(
      <GamesListItem
        game={GamesListMockData[0]}
        ind={0}
        openUpdateScoreBtn={mockOpenUpdateScoreFormFct}
        endGame={mockEndGameFct}
      />
    );
    const listItem = screen.queryByTestId("game-list-item-0");
    expect(listItem).toBeInTheDocument();

    const scoreBtn = screen.queryByTestId("score-btn-0");
    expect(scoreBtn).toBeInTheDocument();
    fireEvent.click(scoreBtn);
    expect(mockOpenUpdateScoreFormFct).toBeCalled();

    const endGameBtn = screen.queryByTestId("end-game-btn-0");
    expect(endGameBtn).toBeInTheDocument();
    fireEvent.click(endGameBtn);
    expect(mockEndGameFct).toBeCalled();

    const homeTeamInfo = screen.queryByTestId("home-team-details-0");
    expect(homeTeamInfo).toBeInTheDocument();
    expect(homeTeamInfo).toBe("Greece 2");

    const awayTeamInfo = screen.queryByTestId("away-team-details-0");
    expect(awayTeamInfo).toBeInTheDocument();
    expect(awayTeamInfo).toBe("Sweden 5");
  });
});

describe("test games list layout", () => {
  test("test list item displaying list of games", () => {
    render(<GamesList games={GamesListMockData} />);
    const listContainer = screen.getByTestId("list-container");
    expect(listContainer).toBeInTheDocument();
    expect(listContainer.children.length).toBe(5);

    const firstListChild = screen.getByTestId("game-list-item-0");
    expect(firstListChild).toBeInTheDocument();

    const scoreBtn = screen.queryByTestId("score-btn-0");
    expect(scoreBtn).toBeInTheDocument();
    fireEvent.click(scoreBtn);

    expect(screen.getByTestId("update-score-form")).toBeInTheDocument();
  });
});
