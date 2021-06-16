import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import ButtonTab from './ButtonTab'

const Header = (): JSX.Element => {
   const mainContext = useContext(MainContext)

   return (
      <div className="flex items-center gap-2 py-4 overflow-scroll header-overflow">
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
   )
}

export default Header
