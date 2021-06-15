export type MenuTabType = {
   id: number
   name: string
   sortTag: string | null
}

export type MainContextType = {
   menuTab: MenuTabType[]
}

export type CryptoCurrencyAsset = {
   id: string
   assetCode: string
   assetName: string
   logoUrl: string
   fullLogoUrl: string
   tags: string[]
}

export type Response = {
   code: string
   message: string | null
   messageDetail: string | null
   data: CryptoCurrencyAsset[]
}

export type Ticker = {
   symbol: string
   priceChange: string
   priceChangePercent: string
   prevClosePrice: string
   lastPrice: string
   volume: string
}

export type TickerResponse = Ticker[]
