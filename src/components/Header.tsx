import { useContext } from 'react'
import { MainContext } from '../context/MainContext'
import ButtonTab from './ButtonTab'

const Header = (): JSX.Element => {
   const mainContext = useContext(MainContext)

   return (
      <div className="flex items-center gap-2">
         {mainContext?.menuTab.map((menu) => (
            <ButtonTab key={menu.id}>{menu.name}</ButtonTab>
         ))}
      </div>
   )
}

export default Header
