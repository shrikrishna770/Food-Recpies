import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Listen for wishlist updates (from CardComponent)
    useEffect(() => {
        const updateWishlist = () => {
            const user = localStorage.getItem("currentUser");
            const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user}`)) || [];
            setWishlist(wishlist);
        };

        updateWishlist(); // Initial load

        window.addEventListener("wishlistUpdated", updateWishlist);
        return () => window.removeEventListener("wishlistUpdated", updateWishlist);
    }, []);

    // Filter wishlist by search term
    const filteredWishlist = wishlist.filter((item) => {
        const title = item.title || "";
        const description = item.description || "";
        const term = searchTerm.toLowerCase();
        return (
            title.toLowerCase().includes(term) ||
            description.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <Navbar />
            <div className="mt-[100px] max-w-[1500px] m-[auto] relative">
                <HiMagnifyingGlass className="absolute text-[22px] text-gray-400 font-[200] top-[8px] left-[10px]" />

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md h-[40px] w-full pl-[35px] outline-none text-[14px] "
                    placeholder="Search Wishlist recipes..."
                />
            </div>
            <div className="flex flex-wrap gap-8 justify-center mt-[50px]">
                {filteredWishlist.length === 0 ? (
                    <h2 className="text-xl text-gray-600">No Wishlist recipe found.</h2>
                ) : (
                    [...filteredWishlist].reverse().map((item, idx) => (
                        <WishlistCard
                            key={idx}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            prepTime={item.prepTime}
                            servings={item.servings}
                            margin="0"
                        />
                    ))
                )}
            </div>
        </>
    );
};

export default Wishlist;