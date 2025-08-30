import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navbar/Navbar'
import CardComponent from './Components/Card/Card'
import Calories from './Components/Calories/Calories'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <CardComponent margin={`${100}px ${20}px`} />
    <Calories />
  </StrictMode>,
)


