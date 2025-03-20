
const ForgetPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1741106696/Blue_Green_White_Simple_Modern_Medical_Logo-removebg-preview_r3wqv9.png"
                        className="w-full max-w-[483px] h-auto"
                        alt="Register Image"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 ">
                    <h1 className="text-3xl md:text-5xl font-medium text-[#364636] text-center">Forgot Password</h1>
                    <form className="mt-8">
                        <div>
                            <label className="text-base block mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full h-12 border border-gray-400 rounded-md text-[#364636] pl-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        {/* Placeholder for error message */}
                        <p className="text-red-500 mt-2 text-center hidden">Error message placeholder</p>
                        <button
                            type="submit"
                            className="mt-8 bg-[#81db58] hover:bg-green-400 w-full h-12 rounded-full text-base text-[#FAF1E6] uppercase transition-colors duration-200"
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;