import { useAtom } from "jotai";
import { useQuery } from "react-query";
import getMe from "../api/getMe";
import { persistUserAtom } from "../atoms/atoms";

const Navbar = () => {
  const [userId, setUserId] = useAtom(persistUserAtom);

  const { data } = useQuery("me", () => getMe(userId));

  return (
    <div className="bg-primary-200 flex justify-between">
      <h1 className="p-3 text-lg font-bold">DMIS</h1>
      {data ? (
        <div className="flex items-center">
          <p className="mr-2">
            {data.firstName} {data.lastName}
          </p>
          <button
            type="button"
            className="text-primary-900 bg-primary-300 hover:bg-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            onClick={() => {
              setUserId(null);
            }}
          >
            Odhlásiť sa
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
