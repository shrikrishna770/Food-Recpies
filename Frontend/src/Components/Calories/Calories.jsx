import Caloriestrade from "../../assets/Caloriestrade.png";

const Calories = () => {
  return (
    <div className="max-w-[1400px] w-full mx-auto mb-[20px] px-4">
      <div className="shadow-lg rounded-xl p-6 border border-gray-200 border-t-0">
        <h1 className="flex items-center gap-3 font-semibold text-xl text-gray-800">
          <img
            src={Caloriestrade}
            alt="Calories Icon"
            className="w-10 h-10 object-contain"
          />
          Calories Overview
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="bg-[#c2e89e] rounded-xl p-6 shadow-md">
            <p className="text-gray-700 font-medium">Average Calories Per Recipe</p>
            <h1 className="text-2xl font-[400] mt-2">425</h1>
          </div>
          <div className="bg-[#deeafa] rounded-xl p-6 shadow-md">
            <p className="text-gray-700 font-medium">Total Recipe</p>
            <h1 className="text-2xl font-[400] mt-2">12</h1>
          </div>
          <div className="bg-[#f0e9f7] rounded-xl p-6 shadow-md">
            <p className="text-gray-700 font-[medium]">Favourite Recipe</p>
            <h1 className="text-2xl font-[400] mt-2">5</h1>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Calories;
