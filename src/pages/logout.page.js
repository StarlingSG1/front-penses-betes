import { useEffect, useState } from "react";
import { logout } from "../api/auth/auth";
import { Paragraph } from "../components/atoms";
import { useUserContext } from "../context";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    
    const { setStatus, setUser } = useUserContext();

    const navigate = useNavigate()

    const logoutFunction = async () => {
        await logout();
        setStatus("disconnected");
        setUser(null);
        navigate("/")
    }

  useEffect(() => {logoutFunction()})
  

  return (
    <>
      
      <div>
        <Paragraph>Vous êtes déconnecté</Paragraph>
      </div>
    </>
  );
}
