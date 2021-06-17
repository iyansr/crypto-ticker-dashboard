import useWebSocket from 'react-use-websocket'

import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchCryptoAssets, fetchTicker } from '../services/API'
import { CryptoCurrencyAsset, MainContextType } from '../types'

import menuTabData from '../utils/menuTabData'

type MainContextProps = {
   children: ReactNode
}

export const MainContext = createContext<MainContextType | undefined>(undefined)
export const MainContextConsumer = MainContext.Consumer

const MainContextProvider = ({ children }: MainContextProps): JSX.Element => {
   const cryptoAssets = useRef<CryptoCurrencyAsset[] | any>([])

   const [sortTag, setSortTag] = useState<string>('all')
   const [searchValue, setSearchValue] = useState<string>('')

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
                  const ticker = cryptoAssetsTicker.data?.filter((t) => t.symbol.includes(f.assetCode) && t.symbol.includes('USDT'))[0]
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
                                   parseFloat(tickerRaw[0].P) < parseFloat(ticker?.priceChangePercent ?? '0')
                                      ? 'down'
                                      : parseFloat(tickerRaw[0].P) > parseFloat(ticker?.priceChangePercent ?? '0')
                                      ? 'up'
                                      : 'stable',
                             },
                  }
               })
               .filter((f) => f.ticker !== undefined)
               .sort((a, b) => {
                  if (a.assetCode < b.assetCode) {
                     return -1
                  }
                  if (a.assetCode > b.assetCode) {
                     return 1
                  }
                  return 0
               })
               .filter((f) => {
                  return f.assetName.toLocaleLowerCase().includes(searchValue)
               })

            if (sortTag === 'all') {
               cryptoAssets.current = filtered
            } else {
               cryptoAssets.current = filtered?.filter((c: { tags: string[] }) => c.tags.includes(sortTag))
            }
         }
      }

      // eslint-disable-next-line
   }, [lastMessage, cryptoAssetsTicker.isLoading, sortTag, searchValue])

   const onShort = (sortTagParam: string): void => {
      setSortTag(sortTagParam)
   }

   return (
      <MainContext.Provider
         value={{
            menuTab: menuTabData,
            cryptoAssets: cryptoAssets.current,
            sortTag,
            onShort,
            searchValue,
            setSearchValue,
         }}>
         {children}
      </MainContext.Provider>
   )
}

export default MainContextProvider
