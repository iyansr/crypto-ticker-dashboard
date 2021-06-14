import { MainCardPage, Header } from './components'

const App = (): JSX.Element => {
   return (
      <div className="bg-gray-100 min-h-screen px-4 md:px-0 py-7">
         <MainCardPage>
            <Header />
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fugit error voluptatibus dolorem odit aspernatur ipsum sapiente ipsa ab! Placeat
               dolorem autem delectus, eligendi tenetur provident fugit eum cumque ullam.
            </p>
         </MainCardPage>
      </div>
   )
}

export default App
