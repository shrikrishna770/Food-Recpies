import image from "../../assets/Recipew.avif"
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FiBold, FiClock } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { FaHeart } from "react-icons/fa";


const CardComponent = ({ margin }) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="border border-gray-300 h-96 w-[460px] h-[410px] rounded-[20px] overflow-hidden shadow-xl hover:scale-101 transform transition-transform duration-100 ease-in-out" style={{ margin }} >
            <div className="h-[200px] w-[100%] overflow-hidden">
                <img
                    src={image}
                    alt=""
                    className="h-[100%] w-[100%] object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                />
            </div>
            <div className="mt-[15px] px-[15px] flex flex-col gap-[10px]">
                <div className="flex  items-center justify-between">
                    <h1 className="text-[20px] font-[400]">Greek Yougurt Parxfait</h1>
                    {!liked ? (
                        <CiHeart
                            size={28}
                            onClick={() => setLiked(true)}
                            className="text-gray-500 hover:text-red-500 cursor-pointer transition-colors duration-300"
                        />
                    ) : (
                        <FaHeart
                            size={26}
                            onClick={() => setLiked(false)}
                            className="text-red-500 cursor-pointer  "
                        />
                    )
                    }

                </div>
                <p className="text-[#4d4b4a]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, quaerat.</p>
                <div className="flex  py-[10px] gap-[40px] items-center">
                    <div className="flex  gap-[8px]">
                        <FiClock size={24} color="gray" v strokeWidth={3} />
                        <h1 className="text-[#4d4b4a]">10 <span>min</span></h1>
                    </div>
                    <div className="flex  gap-[8px]">
                        <GoPeople size={24} color="gray" strokeWidth={1} />
                        <h1 className="text-[#4d4b4a]">1</h1>
                    </div>
                </div>
                <h1 className="text-[green] font-[400]"><a href="/">View Recipe</a></h1>
            </div>
        </div>
    );
};

export default CardComponent;