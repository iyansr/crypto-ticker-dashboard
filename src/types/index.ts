export type MenuTabType = {
   id: number
   name: string
   sortTag: string | null
}

export type CryptoCurrencyAsset = {
   id: string
   assetCode: string
   assetName: string
   logoUrl: string
   fullLogoUrl: string
   tags: string[]
   feeReferenceAsset: string
   ticker: Ticker
}

export type MainContextType = {
   menuTab: MenuTabType[]
   cryptoAssets: CryptoCurrencyAsset[] | undefined
   sortTag: string
   onShort: (sortTagParam: any) => void
   searchValue: string
   setSearchValue: React.Dispatch<React.SetStateAction<string>>
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
   statusPercent: 'up' | 'down' | 'stable' | string
   statusLastPrice: 'up' | 'down' | 'stable' | string
}

export type TickerResponse = Ticker[]
