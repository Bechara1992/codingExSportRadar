import Game from "../../Model/Types/Game.model";
import { ScoreUpdateModel } from "../../Model/Types/ScoreUpdate.model";

class GamesService {
  constructor() {}

  updateGamesScoreAndOrder(
    games: Game[],
    scoreData: ScoreUpdateModel,
    id: string | null
  ): Game[] {
    const selectedGame = games.findIndex((game) => game.id === id);
    games[selectedGame] = {
      ...games[selectedGame],
      homeTeam: { ...games[selectedGame].homeTeam, score: scoreData.home },
      awayTeam: { ...games[selectedGame].awayTeam, score: scoreData.away },
    };

    // const [gameDate, gameTotalScore] = [
    //   games[selectedGame].startTime,
    //   Math.round(games[selectedGame].homeTeam.score) +
    //     Math.round(games[selectedGame].awayTeam.score),
    // ];

    games.sort((a: Game, b: Game) => {
      if (
        Math.round(a.awayTeam.score) + Math.round(a.homeTeam.score) !==
        Math.round(b.awayTeam.score) + Math.round(b.homeTeam.score)
      ) {
        const ac = Math.round(a.awayTeam.score) + Math.round(a.homeTeam.score);
        const bc = Math.round(b.awayTeam.score) + Math.round(b.homeTeam.score);
        return bc - ac;
      }
      return b.startTime.getTime() - a.startTime.getTime();
    });

    return games;
  }
}

export default GamesService;
