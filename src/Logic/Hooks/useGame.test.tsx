import { renderHook, act } from "@testing-library/react";
import useGame from "./useGame";
import Game from "../../Model/Types/Game.model";
import { v4 as uuidv4 } from "uuid";

/**
 * Custom hook should stoe all the games in one array.
 * Should consist of the following methods: createGame, updateGameScores,
 * endGame.
 * When score is updated the hook should return a sorted list by game totalScore,
 * and if 2 games have same score then sorted by the most recently created game.
 */

const mockedGame: Game = {
  id: uuidv4(),
  homeTeam: {
    name: "Germany",
    score: 0,
  },
  awayTeam: {
    name: "Italy",
    score: 0,
  },
  isGameEnded: false,
  startTime: new Date(),
};

describe("test useGame hook", () => {
  test("should render initial state", () => {
    const { result } = renderHook(useGame);
    expect(result.current.games.length).toBe(0);
  });

  test("test add new game", () => {
    const { result } = renderHook(useGame);
    act(() => result.current.createGame(mockedGame));
    expect(result.current.games.length).toBe(1);
  });

  test("test ending a game", () => {
    const { result } = renderHook(useGame);
    act(() => result.current.createGame(mockedGame));
    expect(result.current.games.length).toBe(1);

    act(() => result.current.endGame(mockedGame.id));
    expect(() => result.current.games.length).toBe(0);
  });

  test("test if update score changes the score", () => {
    const { result } = renderHook(useGame);
    act(() => result.current.createGame(mockedGame));
    expect(result.current.games.length).toBe(1);

    act(() => result.current.updateGameScores({ home: 3, guest: 6 }));
    expect(result.current.games.length).toBe(1);
    const [homeScore, awayScore] = [
      result.current.games[0].homeTeam.score,
      result.current.games[0].awayTeam.score,
    ];
    expect(homeScore).toBe(3);
    expect(awayScore).toBe(6);
  });
});
