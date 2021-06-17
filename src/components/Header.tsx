import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import { MainContextType } from '../types'
import ButtonTab from './ButtonTab'
import SearchBar from './SearchBar'

const Header = (): JSX.Element => {
   const mainContext = useContext<MainContextType | undefined>(MainContext)

   return (
      <div className="flex w-full items-center">
         <div className="flex flex-1 items-center gap-2 py-4 overflow-scroll header-overflow">
            {mainContext?.menuTab.map((menu) => (
               <ButtonTab
                  onClick={() => {
                     mainContext.onShort(menu.sortTag)
                  }}
                  isActive={mainContext.sortTag === menu.sortTag}
                  key={menu.id}>
                  {menu.name}
               </ButtonTab>
            ))}
         </div>
         <SearchBar
            value={mainContext?.searchValue}
            onChange={(e) => {
               mainContext?.setSearchValue(e.target.value)
            }}
         />
      </div>
   )
}

export default Header
