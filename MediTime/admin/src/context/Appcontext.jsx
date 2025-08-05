import { createContext } from "react";

export const Appcontext = createContext()
const AppContextProvider =(props)=>{
    const value = {

    }
    return(
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}

export default AppContextProvider