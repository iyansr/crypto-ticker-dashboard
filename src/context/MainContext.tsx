import { createContext, ReactNode } from 'react'

interface MainContextType {
   count: number
}

interface MainContextProps {
   children: ReactNode
}

export const MainContext = createContext<MainContextType | null>(null)
export const MainContextConsumer = MainContext.Consumer

const MainContextProvider = ({ children }: MainContextProps): JSX.Element => {
   return <MainContext.Provider value={{ count: 1 }}>{children}</MainContext.Provider>
}

export default MainContextProvider
