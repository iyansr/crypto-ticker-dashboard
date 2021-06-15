import { CryptoCurrencyAsset } from '../types'

type AssetItemProps = {
   cryptoAsset: CryptoCurrencyAsset
}

const AssetItem = ({ cryptoAsset }: AssetItemProps): JSX.Element => {
   return (
      <div className="w-full flex flex-row bg-white p-4 text-sm border-b font-medium border-gray-200" key={cryptoAsset.id}>
         <div style={{ flex: 3 }} className=" flex flex-row items-center">
            <img src="https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png" alt={`Logo ${cryptoAsset.assetCode}`} className="h-6 w-6 rounded-full" />
            <div className="pl-4">
               <div className="text-base">{cryptoAsset.assetCode}</div>
               <div className="text-xs text-gray-400">{cryptoAsset.assetName}</div>
            </div>
         </div>
         <div style={{ flex: 2 }}>Name</div>
         <div style={{ flex: 2 }}>Name</div>
         <div style={{ flex: 2 }}>Name</div>
         <div className="flex-1">
            <button type="button">Trade</button>
         </div>
      </div>
   )
}

export default AssetItem
