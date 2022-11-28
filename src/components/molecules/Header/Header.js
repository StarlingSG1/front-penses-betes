import { Link } from "react-router-dom";
import { useUserContext } from "../../../context";

export function Header() {

  const { user } = useUserContext();

  return (
    <header className="w-full h-20 flex items-center justify-between bg-primary px-[2.5%]">
      <Link to="/">
        <h1 className="font-roboto text-bold text-xl text-white">Penses-bêtes</h1>
      </Link>
      <div className="flex items-center gap-10">
        {user ?
          <>
            {/* <Link className="text-white cursor-pointer" to="/profile">
              Profil
            </Link> */}
            <Link className="text-white cursor-pointer" to="/logout">
              Deconnexion
            </Link>
          </> :
          <>
            <Link className="text-white cursor-pointer" to="/login">
              Connexion
            </Link>
            <Link className="text-white cursor-pointer" to="/register">
              Inscription
            </Link>
          </>}
      </div>
    </header>
  );
}