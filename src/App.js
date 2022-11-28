import * as React from "react";
import "./App.css";
import { useUserContext } from "./context";
import { AuthRouter } from "./routers/auth";
import { DefaultRouter } from "./routers/default";


export default function App() {

  const { user } = useUserContext();

  return (
    <React.Fragment>
      {!user ? <DefaultRouter /> : <AuthRouter />}
    </React.Fragment>
  );
}
