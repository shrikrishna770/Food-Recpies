import Navbar from "../../Components/Navbar/Navbar";
import RecipeBtn from "../../Components/Crud/AddRecipeBtn";
import Calories from "../../Components/Calories/Calories";
import CardComponent from "../../Components/Card/Card";


const Dashboard = () => {
    return (
        <>
            <Navbar/>
            <RecipeBtn/>
            <Calories/>
            <div className="max-w-[1400px] w-full m-[auto] flex flex-wrap gap-[35px] p-[20px]  px-4">
                 <CardComponent />
            </div> 
            
        </>
    )
}

export default Dashboard