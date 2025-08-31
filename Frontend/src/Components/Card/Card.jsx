import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FiClock } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { FaHeart } from "react-icons/fa";

const CardComponent = ({ image, title, description, prepTime, servings, margin }) => {
  const [liked, setLiked] = useState(false);

  // Check if this recipe is already in wishlist on mount
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
    const isLiked = wishlist.some(item => item.title === title);
    setLiked(isLiked);
  }, [title]);

  // Add to wishlist in localStorage
  const addToWishlist = () => {
    const user = localStorage.getItem("currentUser");
    const wishlistKey = `wishlist_${user}`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    // Prevent duplicates
    if (!wishlist.some(item => item.title === title)) {
      wishlist.push({ image, title, description, prepTime, servings });
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }
    setLiked(true);
    // Optionally, trigger a custom event to notify other components
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Remove from wishlist in localStorage
  const removeFromWishlist = () => {
    const user = localStorage.getItem("currentUser");
    const wishlistKey = `wishlist_${user}`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    wishlist = wishlist.filter(item => item.title !== title);
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    setLiked(false);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div
      className="border border-gray-300 w-[460px] h-[400px] rounded-[20px] overflow-hidden shadow-xl hover:scale-101 transform transition-transform duration-100 ease-in-out"
      style={{ margin }}>
      <div className="h-[200px] w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"/>
      </div>

      <div className="mt-[15px] px-[15px] flex flex-col gap-[8px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-[500]">{title}</h1>
          {!liked ? (
            <CiHeart
              size={28}
              onClick={addToWishlist}
              className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-300"
            />
          ) : (
            <FaHeart
              size={26}
              onClick={removeFromWishlist}
              className="text-red-500 cursor-pointer"
            />
          )}
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

        <h1 className="text-green-600 font-[500] cursor-pointer hover:underline"> View Recipe </h1>
      </div>
    </div>
  );
};

export default CardComponent;
