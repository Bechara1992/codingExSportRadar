import Team from "./Team.model";

type Game = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: Date;
};

export default Game;
