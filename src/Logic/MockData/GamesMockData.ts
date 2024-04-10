import { GameFormData } from "../../Model/Types/GameFormData.model";
import { ScoreUpdateModel } from "../../Model/Types/ScoreUpdate.model";

export const GamesMockData: GameFormData[] = [
  {
    homeTeam: "Germany",
    awayTeam: "Italy",
  },
  {
    homeTeam: "Switzerland",
    awayTeam: "Spain",
  },
  {
    homeTeam: "Portugal",
    awayTeam: "Czech Republic",
  },
  {
    homeTeam: "Greece",
    awayTeam: "Sweden",
  },
  {
    homeTeam: "Serbia",
    awayTeam: "Romania",
  },
];

export const scoreMockData: ScoreUpdateModel[] = [
  {
    home: 3,
    away: 4,
  },
  {
    home: 1,
    away: 0,
  },
  {
    home: 2,
    away: 5,
  },
  {
    home: 2,
    away: 3,
  },
  {
    home: 1,
    away: 4,
  },
];
