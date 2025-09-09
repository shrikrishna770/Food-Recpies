import Caloriestrade from "../../assets/Caloriestrade.png";

const Calories = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 mb-8">
      <div className="shadow-lg rounded-xl py-6 px-4 md:px-6 border border-gray-200 border-t-0">
        <h1 className="flex items-center gap-3 font-semibold text-xl text-gray-800">
          <img src={Caloriestrade} alt="Calories Icon" className="w-10 h-10 object-contain" />
          Calories Overview
        </h1>

        <div className="mt-6 grid md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-[#c2e89e] rounded-xl px-4 py-4 lg:px-6 lg:py-6 shadow-md">
            <p className="text-gray-700 font-medium text-sm lg:text-base">Average Calories Per Recipe</p>
            <h1 className="text-2xl font-normal mt-2">425</h1>
          </div>
          <div className="bg-[#deeafa] rounded-xl px-4 py-4 lg:px-6 lg:py-6 shadow-md">
            <p className="text-gray-700 font-medium text-sm lg:text-base">Total Recipe</p>
            <h1 className="text-2xl font-normal mt-2">12</h1>
          </div>
          <div className="bg-[#f0e9f7] rounded-xl px-4 py-4 lg:px-6 lg:py-6 shadow-md">
            <p className="text-gray-700 font-medium text-sm lg:text-base">Favourite Recipe</p>
            <h1 className="text-2xl font-normal mt-2">5</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calories;