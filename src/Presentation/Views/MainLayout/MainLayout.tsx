import useGame from "../../../Logic/Hooks/useGame";
import AddGameComponent from "../../Components/AddGameComponent/AddGameComponent";
import GamesList from "../../Components/GamesList/GamesList";
interface IMainLayoutProps {}
const MainLayout = ({}: IMainLayoutProps) => {
  const { games, createGame, endGame, updateGameScores } = useGame();

  return (
    <main className="p-4">
      <AddGameComponent createGame={createGame} />
      <GamesList
        games={games}
        endGame={endGame}
        updateGameScores={updateGameScores}
      />
    </main>
  );
};

export default MainLayout;
