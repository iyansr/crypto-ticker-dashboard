import { createContext, ReactNode, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchCryptoAssets, fetchTicker } from '../services/API'
import { CryptoCurrencyAsset, MainContextType } from '../types'

import menuTabData from '../utils/menuTabData'

type MainContextProps = {
   children: ReactNode
}

export const MainContext = createContext<MainContextType | null>(null)
export const MainContextConsumer = MainContext.Consumer

const MainContextProvider = ({ children }: MainContextProps): JSX.Element => {
   const [filteredCryptoAssets, setFilteredCryptoAssets] = useState<CryptoCurrencyAsset[] | undefined>([])

   // eslint-disable-next-line
   const cryptoAssetsList = useQuery('cryptoAssets', fetchCryptoAssets, {
      refetchOnWindowFocus: false,
   })

   const cryptoAssetsTicker = useQuery('cryptoAssetsTicker', fetchTicker, {
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
         if (!cryptoAssetsList.isLoading) {
            const a = cryptoAssetsList.data?.data
               .map((f) => ({
                  ...f,
                  ticker: response.filter((t) => t.symbol.includes(f.assetCode))[0],
               }))
               .filter((f) => f.ticker !== undefined)

            setFilteredCryptoAssets(a)
         }
      },
   })

   useEffect(() => {
      const makeInterval = setInterval(() => {
         cryptoAssetsTicker.refetch()
      }, 2000)
      return () => clearInterval(makeInterval)

      // eslint-disable-next-line
   }, [])

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
