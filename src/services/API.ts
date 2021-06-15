import { CryptoCurrencyAsset } from '../types'

type JSONReponse = {
   data: CryptoCurrencyAsset[]
}

export const fetchCryptoAssets = async (): Promise<JSONReponse> => {
   const res = await fetch(`https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset`)
   return res.json()
}
