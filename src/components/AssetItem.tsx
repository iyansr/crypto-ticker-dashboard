import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { CryptoCurrencyAsset } from '../types'

type AssetItemProps = {
   cryptoAsset: CryptoCurrencyAsset
}

const thousandSeparator = (number: string): string => {
   if (!number) return '0'

   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const AssetItem = ({ cryptoAsset }: AssetItemProps): JSX.Element => {
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
      <div className="w-full flex flex-row bg-white p-4 text-sm border-b font-medium border-gray-200" key={cryptoAsset.id}>
         <div style={{ flex: 3 }} className=" flex flex-row items-center">
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
            className={clsx('text-gray-900', {
               'text-green-600': currentStatus === 'up',
               'text-red-500': currentStatus === 'down',
            })}>
            ${cryptoAsset.ticker?.lastPrice}
         </div>
         <div
            style={{ flex: 2 }}
            className={clsx('text-gray-900', {
               'text-green-600': currentStatus === 'up',
               'text-red-500': currentStatus === 'down',
            })}>
            {cryptoAsset.ticker?.priceChangePercent}%
         </div>
         <div style={{ flex: 2 }}>${thousandSeparator(parseFloat(cryptoAsset.ticker?.volume).toFixed(2))}</div>
         <div className="flex-1">
            <button type="button">Trade</button>
         </div>
      </div>
   )
}

export default AssetItem
