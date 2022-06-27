import React  from "react";

const Home = () => {
    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between mt-10 md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white py-1">
                        Wakanda <br /> Woting sistem
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        The Kingdom of Wakanda is organizing an election for officials who will represent <br/>
                        King T'Challa at future United Nation summits. <br/><br/>
                        Being very modern and forward-thinking,
                        King T'Challa has decided to <br/>
                        leverage the power of blockchain technology to make sure
                        these elections are unhindered, and more importantly, secure.
                    </p>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        In order to make sure all 6 million residents have access to voting, multiple voting
                        centres have been opened across the country. <br/>
                        These centres are places where Wakandans can come and cast their ballot for officials of their choice.
                    </p>
                    <a href="/register"
                       className="text-white text-center w-full mt-14 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                    >
                        Register Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
