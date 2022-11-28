/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { loginUser, verifyToken } from "../api/auth/auth";

const UserContext = React.createContext({ user: null });
UserContext.displayName = "UserContext";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginTheUser = async (payload, token) => {
        setLoading(true);
        setStatus("pending");
        // payload.captcha = token
        const user = await loginUser(payload);
        if (!user.error) {
            localStorage.setItem("penses-betes-token", user.data.token);
            setUser(user.data);
            setStatus("connected");
            setLoading(false);
            return user;
        } else {
            toast.error(user.message);
            setStatus("error");
            setLoading(false);
        }
    };

    const verifyTheToken = async () => {
        setLoading(true);
        const userToken = await verifyToken();
        if (userToken) {
            setUser(userToken);
            setStatus("connected");
        }
        setLoading(false);
    }


    useEffect(() => {
        verifyTheToken();
    }, []);

    const stateValues = useMemo(
        () => ({
            user,
            setUser,
            loading,
            setLoading,
            loginTheUser,
            status,
            verifyTheToken,
            setStatus,
        }),
        [user, setUser, , loading, setLoading, loginTheUser, status, verifyTheToken, setStatus]
    );

    return (
        <UserContext.Provider value={stateValues}>{children}</UserContext.Provider>
    );
};
const useUserContext = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("Context was used outside of its Provider");
    }

    return context;
};

export { UserContextProvider, useUserContext, UserContext };
