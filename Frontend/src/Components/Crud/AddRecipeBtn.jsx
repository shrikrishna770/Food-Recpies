const RecipeBtn = () => {
  return (
    <div className=" flex justify-between max-w-[1500px] w-full mx-auto items-center mt-[100px] mb-[50px]">
      <h1 className="font-[500] text-[22px]">Dashboard</h1>
      <div>
        <button className="border px-[20px] rounded-[12px] flex items-center gap-[10px] bg-green-600 text-white hover:bg-green-700"><span className="text-[28px] ">+</span> Add Recipe</button>
      </div>
    </div>
  )
}

export default RecipeBtn