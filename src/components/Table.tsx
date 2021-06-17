import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import AssetItem from './AssetItem'

const Table = (): JSX.Element => {
   const mainContext = useContext(MainContext)

   return (
      <section className="w-full" data-testid="mainTable">
         <div className="w-full hidden md:flex  flex-row bg-gray-100 p-4 text-xs border-b border-gray-200">
            <div style={{ flex: 3 }}>Name</div>
            <div style={{ flex: 2 }}>Last Price</div>
            <div style={{ flex: 2 }}>24hr Change</div>
            <div style={{ flex: 2 }}>Market Cap</div>
            <div className="flex-1" />
         </div>

         {mainContext?.cryptoAssets?.length === 0 ? (
            <div className="h-80 w-full flex flex-col items-center justify-center">
               <img src="/loader.gif" alt="Loader" className="h-16 w-16" />
            </div>
         ) : (
            mainContext?.cryptoAssets?.map((cryptoAsset, index) => <AssetItem index={index} cryptoAsset={cryptoAsset} key={cryptoAsset.id} />)
         )}
      </section>
   )
}

Table.defaultProps = {
   data: null,
}

export default Table
