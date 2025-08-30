import frame from "../../assets/Frame.png";

const Navbar = () => {
    return (
        <div className="flex shadow-md rounded-lg fixed top-0 left-0 right-0 bg-white z-10 backdrop-blur-3xl bg-white/30">
            <nav className="flex max-w-[1500px] w-[100%] h-[70px] m-[auto] items-center justify-between ">
                <h1 className="text-[#16A34A] font-[600] text-[24px] p-[10px]  h-[28px] flex items-center"><a href="/">RecipeSync</a></h1>
                <ul className="flex h-[36px]  gap-[50px] mr-[20px] items-center">
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/">My Recipe </a></li>
                    <li><a href="/">Public Feed</a></li>
                    <li className=" flex items-center gap-2 p-2">
                        <a href="/" className="flex items-center gap-2">
                            <img src={frame} alt="Logout icon" className="w-5 h-5" />
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>   
            </nav>
        </div>

    )
}
export default Navbar