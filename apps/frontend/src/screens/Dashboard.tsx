import { useAtom } from "jotai";
import { persistUserAtom } from "../atoms/atoms";

const Dashboard = () => {
  const [userId, setUserId] = useAtom(persistUserAtom);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Dashboard content</p>
      <button
        type="button"
        onClick={() => {
          setUserId(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
