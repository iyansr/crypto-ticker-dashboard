import { createContext, ReactNode, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchCryptoAssets } from '../services/API'
import { CryptoCurrencyAsset, MainContextType } from '../types'

import menuTabData from '../utils/menuTabData'

type MainContextProps = {
   children: ReactNode
}

export const MainContext = createContext<MainContextType | null>(null)
export const MainContextConsumer = MainContext.Consumer

const MainContextProvider = ({ children }: MainContextProps): JSX.Element => {
   const [filteredCryptoAssets, setFilteredCryptoAssets] = useState<CryptoCurrencyAsset[] | []>([])

   // eslint-disable-next-line
   const { data } = useQuery('cryptoAssets', fetchCryptoAssets, {
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
         const mappedTag = menuTabData.map((menu) => menu.sortTag)
         const filteredResponse = response.data.filter((item) => item.tags.some((tag) => mappedTag.includes(tag)))
         setFilteredCryptoAssets(filteredResponse)
      },
   })

   return (
      <MainContext.Provider
         value={{
            menuTab: menuTabData,
            cryptoAssets: filteredCryptoAssets,
         }}>
         {children}
      </MainContext.Provider>
   )
}

export default MainContextProvider
