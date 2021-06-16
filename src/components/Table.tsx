import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import AssetItem from './AssetItem'

const Table = (): JSX.Element => {
   const mainContext = useContext(MainContext)

   return (
      <section className="w-full">
         <div className="w-full flex flex-row bg-gray-100 p-4 text-xs border-b border-gray-200">
            <div style={{ flex: 3 }}>Name</div>
            <div style={{ flex: 2 }}>Last Price</div>
            <div style={{ flex: 2 }}>24hr Change</div>
            <div style={{ flex: 2 }}>Name</div>
            <div className="flex-1" />
         </div>

         {mainContext?.cryptoAssets &&
            mainContext?.cryptoAssets?.map(
               (cryptoAsset: {
                  id: any
                  assetCode?: string
                  assetName?: string
                  logoUrl?: string
                  fullLogoUrl?: string
                  tags?: string[]
                  feeReferenceAsset?: string
                  ticker?: any
               }) => <AssetItem cryptoAsset={cryptoAsset} key={cryptoAsset.id} />
            )}
      </section>
   )
}

Table.defaultProps = {
   data: null,
}

export default Table
