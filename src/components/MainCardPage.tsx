interface MainCardPageProps {
   children: React.ReactNode
}

const MainCardPage = ({ children }: MainCardPageProps): JSX.Element => {
   return <div className="container mx-auto bg-white shadow-md p-4 md:p-6">{children}</div>
}

export default MainCardPage
