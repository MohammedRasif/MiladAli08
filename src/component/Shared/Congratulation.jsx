import { NavLink } from "react-router-dom";

const Congratulation = () => {
    return (
        <div>
        <div className="flex items-center pl-80 pt-36 space-x-10">
            <div className="w-[573px] h-[810px] pt-20">
                <img
                    src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                    className="w-[483px] h-[450px]"
                    alt="Login Image"
                />
            </div>
            <div className="w-[573px] h-[810px] pt-36">
                {/* Content */}
                <div className="w-[483px] text-center font-montserrat font-normal text-[20px] leading-[30px] mb-10 ">
                    <p className="font-[500] text-[20px] leading-[30px] text-center  mb-2">
                        Your password has been updated, please change <br /> your password regularly to avoid this happening
                    </p>
                    <h1 className="text-[48px] font-[500] text-center py-10">
                        Congratulations
                    </h1>
                </div>
                {/* Login Button */}
                <div className=" mt-10 mb-12 ">
                    <NavLink to="/login">
                        <button
                            className="w-[481px] h-[54px] rounded-[30px] px-[20px] py-[14px] gap-[10px] bg-[#81db58] hover:bg-green-400 text-[#FAF1E6] font-medium text-base cursor-pointer"
                        >
                            Log In
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Congratulation;
