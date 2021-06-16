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
                  const tickerRaw = messageData?.filter((m: { s: string }) => m.s === ticker?.symbol)
                  return {
                     ...f,
                     ticker:
                        tickerRaw.length === 0
                           ? ticker
                           : {
                                ...ticker,
                                priceChange: tickerRaw[0]?.p,
                                lastPrice: tickerRaw[0]?.c,
                                priceChangePercent: tickerRaw[0]?.P,
                                status:
                                   // eslint-disable-next-line
                                   parseFloat(tickerRaw[0].c) < parseFloat(ticker?.lastPrice ?? '0')
                                      ? 'down'
                                      : parseFloat(tickerRaw[0].c) > parseFloat(ticker?.lastPrice ?? '0')
                                      ? 'up'
                                      : 'stable',
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
