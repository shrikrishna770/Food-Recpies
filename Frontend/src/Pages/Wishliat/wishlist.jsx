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
        <div className="flex flex-col max-w-[1500px] m-[auto]">
            <Navbar />
            <div className=" w-full mt-[100px] px-4 ">
                <h1 className="font-[500] text-[22px]">Wishlist</h1>
            </div>
            <div className="mt-[30px] relative px-4">
                <HiMagnifyingGlass className="absolute text-[22px] text-gray-400 font-[200] top-[8px] left-[23px]" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md h-[40px] w-full pl-[35px] outline-none text-[14px] "
                    placeholder="Search Wishlist recipes..."
                />
            </div>
            <div className="flex flex-wrap gap-8 px-[25px] mt-[30px] ">
                {filteredWishlist.length === 0 ? (
                    <h2 className="text-[17px] text-gray-600">No Wishlist recipe found.</h2>
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
                            onRemove={() => {
                                const user = localStorage.getItem("currentUser");
                                const wishlistKey = `wishlist_${user}`;
                                let wishlistLocal = JSON.parse(localStorage.getItem(wishlistKey)) || [];
                                wishlistLocal = wishlistLocal.filter((i) => i.title !== item.title);
                                localStorage.setItem(wishlistKey, JSON.stringify(wishlistLocal));
                                setWishlist(wishlistLocal);
                            }}
                        />

                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;