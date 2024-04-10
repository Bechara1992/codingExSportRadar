import { useState } from "react";
import Game from "../../../Model/Types/Game.model";
import GamesListItem from "./GamesListItem";
import { ScoreUpdateModel } from "../../../Model/Types/ScoreUpdate.model";
import Popup from "../ReusableComponents/Popup";
import UpdateScoreForm from "../UpdateScore/UpdateScoreForm";

interface IGamesListProps {
  games: Game[];
  endGame: (id: string) => void;
  updateGameScores: (scoreData: ScoreUpdateModel, id: string | null) => void;
}

const GamesList = ({ games, endGame, updateGameScores }: IGamesListProps) => {
  let [open, setOpen] = useState<boolean>(false);
  let [selectedGame, setSelectedGame] = useState<string | null>(null);

  const openUpdateScoreBtn = (id: string) => {
    setSelectedGame(id);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  return (
    <section className="flex flex-col gap-4 mt-8" data-testid="list-container">
      {games.map((game: Game, index: number) => (
        <GamesListItem
          key={game.id}
          game={game}
          ind={index}
          openUpdateScoreBtn={openUpdateScoreBtn}
          endGame={endGame}
        />
      ))}
      <Popup open={open} closePopup={closePopup}>
        <UpdateScoreForm
          closePopup={closePopup}
          submit={updateGameScores}
          id={selectedGame}
        />
      </Popup>
    </section>
  );
};

export default GamesList;
