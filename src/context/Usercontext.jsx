import { useState, createContext } from "react";

export const Usercontext = createContext();

export default function UserProvider({children}){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(

        <Usercontext.Provider
        value={{
            email,
            setEmail,
            password,
            setPassword
        }}>
        {children}
        </Usercontext.Provider>
)
}