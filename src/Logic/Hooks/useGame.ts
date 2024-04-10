import { useState } from "react";
import Game from "../../Model/Types/Game.model";
import { GameFormData } from "../../Model/Types/GameFormData.model";
import { v4 as uuidv4 } from "uuid";
import { ScoreUpdateModel } from "../../Model/Types/ScoreUpdate.model";
import GamesService from "../Services/Games.service";

const useGame = () => {
  let [games, setGames] = useState<Game[]>([]);
  const gamesService = new GamesService();
  const createGame = (gameData: GameFormData, index?: number) => {
    /**
     * A new game when created will have by default 0 scores,
     * a unique uuid and the current timeStamp
     */

    let date = new Date();
    if (index) date.setTime(date.getTime() + 100 * index);

    const newGame: Game = {
      id: uuidv4(),
      homeTeam: {
        name: gameData.homeTeam,
        score: 0,
      },
      awayTeam: {
        name: gameData.awayTeam,
        score: 0,
      },
      startTime: date,
    };
    setGames(gamesService.orderGames([...games, newGame]));
  };

  const updateGameScores = (scoreData: ScoreUpdateModel, id: string | null) => {
    setGames((prev) =>
      gamesService.updateGamesScoreAndOrder(prev, scoreData, id)
    );
  };

  const endGame = (id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
  };

  return { games, createGame, endGame, updateGameScores };
};

export default useGame;
