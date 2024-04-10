import { renderHook, act } from "@testing-library/react";
import useGame from "./useGame";
import { GameFormData } from "../../Model/Types/GameFormData.model";
import {
  GamesMockData,
  scoreMockData,
} from "../MockData/GamesCreatingMockData";
import { ScoreUpdateModel } from "../../Model/Types/ScoreUpdate.model";

/**
 * Custom hook should stoe all the games in one array.
 * Should consist of the following methods: createGame, updateGameScores,
 * endGame.
 * When score is updated the hook should return a sorted list by game totalScore,
 * and if 2 games have same score then sorted by the most recently created game.
 */

describe("test useGame hook", () => {
  test("should render initial state", () => {
    const { result } = renderHook(useGame);
    expect(result.current.games.length).toBe(0);
  });

  test("test add new game", () => {
    const { result } = renderHook(useGame);
    act(() => result.current.createGame(GamesMockData[0]));
    expect(result.current.games.length).toBe(1);
  });

  test("test ending a game", () => {
    const { result } = renderHook(useGame);
    act(() => result.current.createGame(GamesMockData[0]));
    expect(result.current.games.length).toBe(1);

    act(() => result.current.endGame(result.current.games[0].id));

    expect(result.current.games.length).toBe(0);
  });

  test("test if update score changes the score", () => {
    const { result } = renderHook(useGame);
    // Create a game
    act(() => result.current.createGame(GamesMockData[0]));
    expect(result.current.games.length).toBe(1);

    // Update scores
    act(() =>
      result.current.updateGameScores(
        { home: 3, away: 6 },
        result.current.games[0].id
      )
    );

    // Check updated scores
    expect(result.current.games.length).toBe(1);
    const [homeScore, awayScore] = [
      result.current.games[0].homeTeam.score,
      result.current.games[0].awayTeam.score,
    ];
    expect(homeScore).toBe(3);
    expect(awayScore).toBe(6);
  });

  test("check if games get sorted correctly", () => {
    const { result } = renderHook(useGame);

    // Create games from mock data.
    GamesMockData.forEach((game: GameFormData, index: number) => {
      act(() => result.current.createGame(game, index));
    });
    expect(result.current.games.length).toBe(5);

    /**
     * Update games with mock data.
     * Ideally ids from previous results should be stored in a different arra
     * and used, however the way this functions makes this useless
     */
    scoreMockData.forEach((score: ScoreUpdateModel, index: number) => {
      act(() =>
        result.current.updateGameScores(score, result.current.games[index].id)
      );
    });

    expect(result.current.games[0].homeTeam.name).toBe("Greece");
    expect(result.current.games[1].homeTeam.name).toBe("Germany");
    expect(result.current.games[2].homeTeam.name).toBe("Portugal");
    expect(result.current.games[3].homeTeam.name).toBe("Switzerland");
    expect(result.current.games[4].homeTeam.name).toBe("Serbia");
  });
});
