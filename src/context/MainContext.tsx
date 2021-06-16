import useWebSocket from 'react-use-websocket'

import { createContext, ReactNode, useEffect, useRef } from 'react'
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
   const messageHistory = useRef<CryptoCurrencyAsset[] | any>([])

   const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr'
   const { lastMessage } = useWebSocket(socketUrl)

   // eslint-disable-next-line
   const cryptoAssetsList = useQuery('cryptoAssets', fetchCryptoAssets, {
      refetchOnWindowFocus: false,
   })

   const cryptoAssetsTicker = useQuery('cryptoAssetsTicker', fetchTicker, {
      refetchOnWindowFocus: false,
   })

   useEffect(() => {
      if (lastMessage) {
         const messageData = JSON.parse(lastMessage?.data)
         if (!cryptoAssetsTicker.isLoading) {
            const filtered = cryptoAssetsList.data?.data
               .map((f) => {
                  const ticker = cryptoAssetsTicker.data?.filter((t) => t.symbol.includes(f.assetCode) && t.symbol.includes('BTC'))[0]

                  return {
                     ...f,
                     ticker:
                        messageData?.filter((m: { s: string }) => m.s === ticker?.symbol).length === 0
                           ? ticker
                           : {
                                ...ticker,
                                priceChange: messageData?.filter((m: { s: string }) => m.s === ticker?.symbol)[0]?.p,
                                lastPrice: messageData?.filter((m: { s: string }) => m.s === ticker?.symbol)[0]?.c,
                                priceChangePercent: messageData?.filter((m: { s: string }) => m.s === ticker?.symbol)[0]?.P,
                             },
                  }
               })
               .filter((f) => f.ticker !== undefined)

            messageHistory.current = filtered
         }
      }

      // eslint-disable-next-line
   }, [lastMessage, cryptoAssetsTicker.isLoading])

   return (
      <MainContext.Provider
         value={{
            menuTab: menuTabData,
            cryptoAssets: messageHistory.current,
         }}>
         {children}
      </MainContext.Provider>
   )
}

export default MainContextProvider
