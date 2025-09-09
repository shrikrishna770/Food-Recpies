import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const updateWishlist = () => {
      const user = localStorage.getItem("currentUser");
      const wishlistData =
        JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
      setWishlist(wishlistData);
    };

    updateWishlist();

    window.addEventListener("wishlistUpdated", updateWishlist);
    return () => window.removeEventListener("wishlistUpdated", updateWishlist);
  }, []);

  const filteredWishlist = wishlist.filter((item) => {
    const title = item.title || "";
    const description = item.description || "";
    const term = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(term) ||
      description.toLowerCase().includes(term)
    );
  });

  const handleRemove = (_id) => {
    const user = localStorage.getItem("currentUser");
    const wishlistKey = `wishlist_${user}`;
    let wishlistLocal = JSON.parse(localStorage.getItem(wishlistKey)) || [];

    // Remove by _id instead of title
    wishlistLocal = wishlistLocal.filter((item) => item._id !== _id);

    localStorage.setItem(wishlistKey, JSON.stringify(wishlistLocal));
    setWishlist(wishlistLocal);

    // Dispatch event to notify Dashboard
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="flex flex-col max-w-[1400px] mx-auto px-4 w-full">
      <Navbar />

      <div className="w-full mt-24 mb-6 md:mt-[100px]">
        <h1 className="font-semibold text-2xl md:text-[22px]">Wishlist</h1>
      </div>

      <div className="relative mb-6 w-full">
        <HiMagnifyingGlass className="absolute text-xl text-gray-400 font-light top-1/2 -translate-y-1/2 left-4 md:left-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg h-10 w-full pl-10 pr-4 outline-none text-sm focus:ring-2 focus:ring-green-500 transition-colors"
          placeholder="Search your recipes..."
        />
      </div>

      <div className="grid grid-cols-1 xxs:grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {filteredWishlist.length === 0 ? (
          <h2 className="text-lg text-gray-600 col-span-full text-center">
            No Wishlist recipe found.
          </h2>
        ) : (
          [...filteredWishlist].reverse().map((item) => (
            <WishlistCard
              key={item._id}
              _id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              prepTime={item.prepTime}
              cookTime={item.cookTime}
              servings={item.servings}
              onRemove={() => handleRemove(item._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;