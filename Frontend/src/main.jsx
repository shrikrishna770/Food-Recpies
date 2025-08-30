import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './Components/Navbar/Navbar'
import CardComponent from './Components/Card/Card'
import Calories from './Components/Calories/Calories'
import RecipeBtn from './Components/Crud/AddRecipeBtn'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RecipeBtn />
    <Calories />
    <div className='max-w-[1500px] w-full m-[auto] flex flex-wrap gap-[35px] p-[20px]'>
      <CardComponent />
    </div>


  </StrictMode>,
)



