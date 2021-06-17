import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CryptoCurrencyAsset } from '../types'

type AssetItemProps = {
   cryptoAsset: CryptoCurrencyAsset
   index: number
}

const thousandSeparator = (number: string): string => {
   if (!number) return '0'

   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const AssetItem = ({ cryptoAsset, index }: AssetItemProps): JSX.Element => {
   const [currentStatus, setCurrentStatus] = useState<string>(cryptoAsset.ticker.status)

   useEffect(() => {
      setCurrentStatus((prev) => {
         if (prev === cryptoAsset.ticker.status) {
            return prev
         }
         return cryptoAsset.ticker.status
      })
   }, [cryptoAsset.ticker.status])

   return (
      <div
         data-testid={`asset-${index}`}
         className="w-full flex flex-col md:flex-row bg-white p-4 text-sm border-b font-medium border-gray-200 hover:bg-gray-100 transition duration-200"
         key={cryptoAsset.id}>
         {/* {DESKTOP} */}
         <div style={{ flex: 3 }} className="flex flex-row items-center">
            <img
               src="https://cdn.techinasia.com/data/images/ubhDcXriUDx0nSklmg659rspXh6ZiTA7ciHUi1o3.png"
               alt={`Logo ${cryptoAsset.assetCode}`}
               className="h-6 w-6 rounded-full"
            />
            <div className="pl-4">
               <div className="text-base">{cryptoAsset.assetCode}</div>
               <div className="text-xs text-gray-400">{cryptoAsset.assetName}</div>
            </div>
         </div>
         <div
            style={{ flex: 2 }}
            className={clsx('text-gray-900 hidden md:block transition-colors duration-300', {
               'text-green-600': currentStatus === 'up',
               'text-red-500': currentStatus === 'down',
            })}>
            ${thousandSeparator(parseFloat(cryptoAsset.ticker?.lastPrice).toFixed(2))}
         </div>
         <div
            style={{ flex: 2 }}
            className={clsx('text-gray-900 hidden md:block transition-colors duration-300', {
               'text-green-600': currentStatus === 'up',
               'text-red-500': currentStatus === 'down',
            })}>
            {cryptoAsset.ticker?.priceChangePercent}%
         </div>
         <div style={{ flex: 2 }} className="hidden md:block">
            ${thousandSeparator(parseFloat(cryptoAsset.ticker?.volume).toFixed(2))}
         </div>
         <div className="flex-1 md:block hidden">
            <a
               target="_blank"
               href={`https://www.binance.com/en/trade/${cryptoAsset.assetCode}_USDT?layout=pro&type=spot`}
               rel="noopener noreferrer"
               type="button"
               className="bg-white px-4 py-1 rounded-sm border focus:outline-none border-yellow-200 text-yellow-600">
               Trade
            </a>
         </div>

         <div className="flex md:hidden items-center justify-between mt-2">
            <div className="text-xs text-gray-400">Last Price</div>
            <div
               className={clsx('text-gray-900 transition-colors duration-300', {
                  'text-green-600': currentStatus === 'up',
                  'text-red-500': currentStatus === 'down',
               })}>
               ${cryptoAsset.ticker?.lastPrice}
            </div>
         </div>

         <div className="flex md:hidden items-center justify-between mt-2">
            <div className="text-xs text-gray-400">24h Change</div>
            <div
               className={clsx('text-gray-900 transition-colors duration-300', {
                  'text-green-600': currentStatus === 'up',
                  'text-red-500': currentStatus === 'down',
               })}>
               {cryptoAsset.ticker?.priceChangePercent}%
            </div>
         </div>

         <div className="flex md:hidden items-center justify-between mt-2">
            <div className="text-xs text-gray-400">market Cap</div>
            <div className="text-gray-900 transition-colors duration-300">${thousandSeparator(parseFloat(cryptoAsset.ticker?.volume).toFixed(2))}</div>
         </div>

         <div className="flex justify-end md:hidden w-full flex-row mt-2">
            <a
               target="_blank"
               href={`https://www.binance.com/en/trade/${cryptoAsset.assetCode}_USDT?layout=pro&type=spot`}
               rel="noopener noreferrer"
               type="button"
               className="bg-white px-4 py-1 rounded-sm border focus:outline-none border-yellow-200 text-yellow-600">
               Trade
            </a>
         </div>
      </div>
   )
}

export default AssetItem
