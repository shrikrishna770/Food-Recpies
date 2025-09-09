import { FiClock } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishlistCard = ({
  _id,
  image,
  title,
  description,
  prepTime,
  cookTime,
  servings,
  onRemove,
}) => {
  return (
    <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-xl">
      {/* Responsive image container */}
      <div className="relative w-full pb-[66.66%]"> {/* 3:2 Aspect Ratio */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">{title}</h1>
          <FaHeart
            size={26}
            className="text-red-500 cursor-pointer"
            onClick={onRemove}
            aria-label="Remove from wishlist"
          />
        </div>

        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>

        <div className="flex py-2 gap-10 items-center">
          <div className="flex gap-2 items-center">
            <FiClock size={20} color="gray" strokeWidth={3} />
            <h1 className="text-gray-700">{prepTime}</h1>
          </div>

          <div className="flex gap-2 items-center">
            <GoPeople size={20} color="gray" strokeWidth={1} />
            <h1 className="text-gray-700">{servings}</h1>
          </div>
        </div>

        <Link to={`/view-item/${_id}`}>
          <h1 className="text-green-600 font-medium cursor-pointer hover:underline">
            View Recipe
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default WishlistCard;