import Team from "./Team.model";

type Game = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: Date;
  isGameEnded: boolean;
};

export default Game;
