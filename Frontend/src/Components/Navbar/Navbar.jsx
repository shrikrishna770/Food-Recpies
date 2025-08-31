import { useState } from "react";
import { Menu, X } from "lucide-react";
import frame from "../../assets/Frame.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex shadow-md rounded-lg fixed top-0 left-0 right-0 z-10 backdrop-blur-3xl bg-white/30">
            <nav className="flex max-w-[1500px] w-full h-[70px] mx-auto items-center justify-between px-4">
                <h1 className="text-[#16A34A] font-[600] text-[24px] flex items-center">
                    <a href="/">RecipeSync</a>
                </h1>

                <ul className="hidden md:flex h-[36px] gap-[40px] mr-[20px] items-center text-[16px] font-medium">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/my-recipes">My Recipe</a></li>
                    <li><a href="/public-feed">Public Feed</a></li>
                    <li className="flex items-center gap-2 p-2">
                        <button
                            onClick={() => {
                                localStorage.removeItem("token"); 
                                window.location.href = "/login"; 
                            }}
                            className="flex items-center gap-2"
                        >
                            <img src={frame} alt="Logout icon" className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>

                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {isOpen && (
                <div
                    className={`absolute top-[70px] left-[60%] right-0 bg-white/95 shadow-lg rounded-b-lg md:hidden border border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <ul className="flex flex-col gap-4 py-4 text-[16px] font-medium ml-[10px]">
                        <li><a href="/" onClick={() => setIsOpen(false)}>Dashboard</a></li>
                        <li><a href="/" onClick={() => setIsOpen(false)}>My Recipe</a></li>
                        <li><a href="/" onClick={() => setIsOpen(false)}>Public Feed</a></li>
                        <li className="flex items-center gap-2">
                            <a href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                                <img src={frame} alt="Logout icon" className="w-5 h-5" />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
