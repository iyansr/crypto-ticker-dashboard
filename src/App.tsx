import ButtonTab from './components/ButtonTab'

const App: React.FC = () => {
   return (
      <div className="bg-gray-100 min-h-screen px-4 md:px-0 py-7">
         <div className="container mx-auto bg-white shadow-md p-4 md:p-6">
            <div className="flex items-center gap-2">
               <ButtonTab>All</ButtonTab>
            </div>
            <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint fugit error voluptatibus dolorem odit aspernatur ipsum sapiente ipsa ab! Placeat
               dolorem autem delectus, eligendi tenetur provident fugit eum cumque ullam.
            </p>
         </div>
      </div>
   )
}

export default App
