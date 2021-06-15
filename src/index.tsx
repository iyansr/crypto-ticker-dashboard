import React from 'react'
import ReactDOM from 'react-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import MainContextProvider from './context/MainContext'

import './style/index.css'

// Create a client
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity,
      },
   },
})

ReactDOM.render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <MainContextProvider>
            <App />
         </MainContextProvider>
      </QueryClientProvider>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
