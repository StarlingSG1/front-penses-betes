import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";
import { NavLink } from "../../atoms";
import { PensesBetes } from "../../atoms/Text/PensesBetes";

export function Header() {

  const { user, open, setOpen, setActiveId } = useUserContext();

  return (
    <header className={`w-full h-[60px] z-50 px-6 small:px-0 bg-black flex justify-center`}>
      <div className="h-full w-full max-w-[800px] flex justify-between items-center">
        <PensesBetes>Penses-bêtes</PensesBetes>
        {!user ? <ul className="sm:flex hidden items-center gap-20"><NavLink href="/" activeId={1}>Accueil</NavLink>
          <NavLink href="/login" activeId={2}>Connexion</NavLink>
          <NavLink href="/register" activeId={3}>Inscription</NavLink>
        </ul> : <div className="sm:flex hidden items-center gap-20">
          <NavLink href="/" activeId={1}>Accueil</NavLink>
          {/* <NavLink href="/account" activeId={2}>Compte</NavLink> */}
          <NavLink href="/logout" activeId={3}>Deconnexion</NavLink>
        </div>}
        <div
          className="block absolute right-[24px] cursor-pointer sm:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={joinClasses(
              "mb-2 block h-[3px] w-[30px] rounded-full bg-white transition duration-300 ease-in-out",
              open && "translate-y-[11px] rotate-45 transform"
            )}
          />
          <span
            className={joinClasses(
              "mb-2 block h-[3px] translate-x-[7px] w-[23px] rounded-full bg-white transition duration-300 ease-in-out",
              open && "opacity-0"
            )}
          />
          <span
            className={joinClasses(
              "block h-[3px] w-[30px] rounded-full bg-white transition duration-300 ease-in-out",
              open && "-translate-y-[11px] -rotate-45 transform"
            )}
          />
        </div>
      </div>
    </header>
  );
}


