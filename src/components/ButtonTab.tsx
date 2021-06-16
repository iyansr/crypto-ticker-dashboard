import clsx from 'clsx'

type ButtonTabProps = {
   children: React.ReactNode
   isActive?: boolean
   onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonTab = ({ isActive, children, onClick }: ButtonTabProps): JSX.Element => {
   return (
      <button
         onClick={onClick}
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
   onClick: () => null,
}

export default ButtonTab
