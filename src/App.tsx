import { MainCardPage, Header, Table } from './components'

const App = (): JSX.Element => {
   return (
      <div className="bg-gray-100 min-h-screen px-4 md:px-0 py-7">
         <MainCardPage>
            <Header />
            <Table />
         </MainCardPage>
      </div>
   )
}

export default App
