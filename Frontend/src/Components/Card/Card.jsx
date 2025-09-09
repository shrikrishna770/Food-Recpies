// Card.jsx
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FiClock } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardComponent = ({ _id, image, title, description, prepTime, cookTime, servings, calories, ingredients = [], instruction = [], tags = [], isPublic = false}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
    const isLiked = wishlist.some(item => item.title === title);
    setLiked(isLiked);
  }, [title]);

  const addToWishlist = () => {
    const user = localStorage.getItem("currentUser");
    const wishlistKey = `wishlist_${user}`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    if (!wishlist.some(item => item.title === title)) {
      wishlist.push({ _id, image, title, description, prepTime, cookTime, servings });
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }
    setLiked(true);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

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
      className="border border-gray-300 rounded-2xl overflow-hidden shadow-xl hover:scale-101 transform transition-transform duration-100 ease-in-out flex flex-col h-full w-full">
      
      <div className="relative w-full pb-[66.66%]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"/>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">{title}</h1>
          {!liked ? (
            <CiHeart
              size={28}
              onClick={addToWishlist}
              className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-300"/>
          ) : (
            <FaHeart
              size={26}
              onClick={removeFromWishlist}
              className="text-red-500 cursor-pointer"/>
          )}
        </div>

        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>

        <div className="flex py-2 gap-10 items-center mt-auto">
          <div className="flex gap-2 items-center">
            <FiClock size={20} color="gray" strokeWidth={3} />
            <h1 className="text-gray-700">{prepTime}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <GoPeople size={20} color="gray" strokeWidth={1} />
            <h1 className="text-gray-700">{servings}</h1>
          </div>
        </div>

        <Link
          to={`/view-item/${_id}`}
          state={{ image, title, description, prepTime, cookTime, servings, calories, ingredients, instruction, tags, isPublic}} >
          <h1 className="text-green-600 font-medium cursor-pointer hover:underline">
            View Recipe
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default CardComponent;