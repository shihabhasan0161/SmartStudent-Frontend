import { createContext , useState} from "react";

const AppContext = createContext();

export const AppContextProvider = ({child} ) => {

    const [user, setUser] = useState(null);
    
    const value = () => {
        return { user, setUser };
    }
    return (
        <AppContext.Provider value={{value}}>
            {child}
        </AppContext.Provider>
    )
}