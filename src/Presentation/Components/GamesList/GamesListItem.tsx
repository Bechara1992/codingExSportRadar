import Game from "../../../Model/Types/Game.model";

interface IGamesListItemProps {
  game: Game;
  openUpdateScoreBtn: (id: string) => void;
  endGame: (id: string) => void;
  ind: number;
}

const GamesListItem = ({
  game,
  ind,
  openUpdateScoreBtn,
  endGame,
}: IGamesListItemProps) => {
  return (
    <div className="flex flex-row" data-testid={`game-list-item-${ind}`}>
      <div className="flex flex-row gap-2">
        <div className="content-center">
          <span
            data-testid={`away-team-details-${ind}`}
          >{`${game.homeTeam.name} ${game.homeTeam.score}`}</span>
          -
          <span
            data-testid={`home-team-details-${ind}`}
          >{`${game.awayTeam.name} ${game.awayTeam.score}`}</span>{" "}
        </div>
        <button
          type="button"
          className="rounded bg-gray-200 px-4 py-2"
          onClick={() => openUpdateScoreBtn(game.id)}
          data-testid={`score-btn-${ind}`}
        >
          Edit Score
        </button>
        <button
          type="button"
          className="rounded bg-gray-200 px-4 py-2"
          onClick={() => endGame(game.id)}
          data-testid={`end-game-btn-${ind}`}
        >
          End Game
        </button>
      </div>
    </div>
  );
};

export default GamesListItem;
