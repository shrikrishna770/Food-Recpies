import { FiClock } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const WishlistCard = ({ image, title, description, prepTime, servings, margin, onRemove}) => {
  return (
    <div
      className="border border-gray-300 w-[460px] h-[400px] rounded-[20px] overflow-hidden shadow-xl"
      style={{ margin }}
    >
      <div className="h-[200px] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-[15px] px-[15px] flex flex-col gap-[8px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-[500]">{title}</h1>
          <FaHeart
            size={26}
            className="text-red-500 cursor-pointer"
            onClick={onRemove}
          />
        </div>
        <p className="text-[#4d4b4a] text-sm line-clamp-2">{description}</p>
        <div className="flex py-[10px] gap-[40px] items-center">
          <div className="flex gap-[8px] items-center">
            <FiClock size={20} color="gray" strokeWidth={3} />
            <h1 className="text-[#4d4b4a]">{prepTime}</h1>
          </div>
          <div className="flex gap-[8px] items-center">
            <GoPeople size={20} color="gray" strokeWidth={1} />
            <h1 className="text-[#4d4b4a]">{servings}</h1>
          </div>
        </div>
        <h1 className="text-green-600 font-[500] cursor-pointer hover:underline">
          View Recipe
        </h1>
      </div>
    </div>
  );
};

export default WishlistCard;
