import useGame from "../../../Logic/Hooks/useGame";
import AddGameComponent from "../../Components/AddGameComponent/AddGameComponent";
interface IMainLayoutProps {}
const MainLayout = ({}: IMainLayoutProps) => {
  const { games, createGame, endGame, updateGameScores } = useGame();

  return (
    <main className="p-4">
      <AddGameComponent />
    </main>
  );
};

export default MainLayout;
