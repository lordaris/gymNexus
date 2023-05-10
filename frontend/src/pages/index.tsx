import React from "react";
import Link from "next/link";
import LoginRedirect from "@/pages/components/loginRedirect";
const Home = () => {
  LoginRedirect();
  return (
    <div className=" min-h-screen">
      <div className="text-left pl-10 pt-10 text-xl ">
        <p className={"pt-10 pb-2"}>Welcome to </p>
        <p className={"pb-2"}>your personalized</p>
        <p>fitness journey</p>
      </div>
      <div className="text-left pl-10 pt-4 text-5xl font-sans lg:text-6xl lg:pl-20">
        <span className={"font-thin font-lato"}>gym</span>
        <span className={"font-bebas-neue"}>NEXUS</span>
      </div>
      <div className="fixed bottom-0 right-0 flex-col lg:static lg:pt-40 lg:w-1/2 lg:float-right flex ">
        <Link
          href="/coach/signup"
          className="bg-blue-500 lg:text-3xl px-6  pr-20 pl-20 rounded-l-full text-2xl hover:bg-blue-400 "
        >
          <button className={"py-4 "}>I am new</button>
        </Link>

        <div className="text-right mt-4 mb-20 pt-4 pr-4 text-lg lg:mr-20 lg:text-3xl">
          <p className={"pb-4"}>Already a member?</p>
          <Link href="/login" className="link link-primary">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
