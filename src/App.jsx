import React from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import StartPage from './pages/startPage.jsx/StartPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import QuizPage from './pages/quizPage/QuizPage'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<StartPage/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/quizPage' element={<QuizPage/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App