import { ChangeEventHandler, ReactElement } from 'react'

type SearchBarType = {
   value: string | undefined
   onChange: ChangeEventHandler<HTMLInputElement>
}

const SearchBar = ({ value, onChange }: SearchBarType): ReactElement => {
   return (
      <div className="pl-1">
         <div className="w-40 border h-7 flex bg-white rounded-md overflow-hidden">
            <div className="text-sm flex flex-col px-2 w-10 items-center justify-center">
               <svg width={14} height={14} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx={11.767} cy={11.767} r={8.989} stroke="#130F26" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.018 18.485L21.542 22" stroke="#130F26" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
            <input
               onChange={onChange}
               value={value}
               type="text"
               placeholder="Search Coin Name"
               className="text-sm placeholder-gray-400 text-gray-500 outline-none focus:outline-none"
            />
         </div>
      </div>
   )
}

export default SearchBar
