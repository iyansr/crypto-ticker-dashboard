import clsx from 'clsx'

type ButtonTabProps = {
   children: React.ReactNode
   isActive?: boolean
}

const ButtonTab = ({ isActive, children }: ButtonTabProps): JSX.Element => {
   return (
      <button
         type="button"
         className={clsx('text-xs px-4 py-1 rounded-md border focus:outline-none', {
            'text-yellow-600': isActive,
            'border-yellow-200': isActive,
            'bg-yellow-50': isActive,
         })}>
         {children}
      </button>
   )
}

ButtonTab.defaultProps = {
   isActive: false,
}

export default ButtonTab
