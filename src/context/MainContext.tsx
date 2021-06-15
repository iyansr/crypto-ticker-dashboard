import { createContext, ReactNode } from 'react'
import { MainContextType } from '../types'

import menuTabData from '../utils/menuTabData'

type MainContextProps = {
   children: ReactNode
}

export const MainContext = createContext<MainContextType | null>(null)
export const MainContextConsumer = MainContext.Consumer

const MainContextProvider = ({ children }: MainContextProps): JSX.Element => {
   return (
      <MainContext.Provider
         value={{
            menuTab: menuTabData,
         }}>
         {children}
      </MainContext.Provider>
   )
}

export default MainContextProvider
