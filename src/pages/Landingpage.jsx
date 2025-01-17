import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import land1 from "../assets/Icons SVG/land5img.png";
import land2 from "../assets/Icons SVG/land2.png";
import appstore from "../assets/Icons SVG/appstore.png";
import playstore from "../assets/Icons SVG/playstore.png";
import land5img from "../assets/Icons SVG/land1.png";
import land6plus from "../assets/Icons SVG/land6plus.svg";
import land6minus from "../assets/Icons SVG/land6minus.svg";
import land8img from "../assets/Icons SVG/land8img.png";
import land7img from "../assets/Icons SVG/land7img.png";
import Footer from "../components/Footer";
import IndustryData from "../Cards/Talent/IndustryData";
import DramaCards from "../Cards/Talent/DramaCards";
import "../CSS/Landingpage.css";
import LandingPagetalent from "../Cards/LandingPagetalent";
import MockupHandR from '../assets/Icons SVG/MockupHandR.png'
import IndustryPage from "../Cards/Talent/IndustryPage";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SearchLand from "../components/SearchLand";
const Landingpage = () => {
  const talentData = useContext(IndustryData);
  const { currentUser } = useAuth();
  const UserID = currentUser ? currentUser.uid : null;
  const navigate = useNavigate();
  const handleHome = async () => {
    if (UserID) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }
  const contactEmail = "support@youtooart.com";
  const subject = encodeURIComponent("Inquiry from YouTooArt Website");
  const body = encodeURIComponent("Hello YouTooArt Team,\n\nI would like to inquire about...");

  const handleContact = () => {
    if (UserID) {
      navigate("/talent");
    } else {
      navigate("/login");
    }
  }

  const handleTalent = async () => {
    if (UserID) {
      navigate("/talent");
    } else {
      navigate("/login");
    }
  }
  const handleCalls = async () => {
    if (UserID) {
      navigate("/casting/calls");
    } else {
      navigate("/login");
    }
  }

  const landingtalent = true;
  const [visibleSections, setVisibleSections] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleVisible = (index) => {
    setVisibleSections((prevState) =>
      prevState.map((visible, i) => (i === index ? !visible : visible))
    );
  };
  return (
    <div className="land md:w-full  ">
      <Navbar className="" />
      <div className="abe flex md:flex md:flex-row pt-10 md:pl-10 mt-5">
        <div className="left md:ml-8 md:w-1/2">
          <h1 className="abe text-[43px] tracking-tight md:mt-4 md:ml-0 ml-3 md:text-start md:text-4xl lg:text-4xl">
            Connect, Collaborate, Create:
          </h1>
          <h1 className="abe tracking-tight text-[43px] md:ml-0 ml-3 text-start md:text-4xl lg:text-6xl md:mt-3">
            <span className="text-[#d6587f] ">CineTroop</span>-Your Artistic
            Marketplace.
          </h1>
          <p className=" abe 2xl:mt-8 mt-5 md:text-lg md:m-0 m-3 text-start text-[#252525]">
            Empowering artists to forge meaningful connections and bring
            creative visions to life.Join the artistic revolution at YouTooArt.
          </p>

          <div className="md:flex hidden justify-start items-start mt-4">
            <div className="w-full max-w-2xl">
              <SearchLand />
            </div>
          </div>

          <div className="flex md:text-base text-xl md:ml-0 ml-3 justify-start">
            <button onClick={handleHome} className="p-3 border rounded-3xl border-gray-600 mt-7">
              Get Started
            </button>
          </div>
          <div className="flex justify-center md:justify-start gap-4 mt-10 md:mt-44">
            <a
              href="https://apps.apple.com"
              target="_blank"
              className="md:w-[25%] w-[45%] shadow-xl">
              <img src={appstore} className="" alt="App Store" />

            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              className="md:w-[25%] w-[45%] shadow-xl">
              <img
                src={playstore}
                className=""
                alt="Play Store"
              />
            </a>
          </div>
        </div>
        <div className="right hidden md:block md:w-1/2">
          <img className="md:w-[92%]" src={land1} alt="" />
        </div>
      </div>

      <div className="land2 flex flex-col">
        <div className="w-[100%] mt-10 md:mt-32">
          <img src={land2} alt="image" />
          <div className="flex flex-col justify-center items-center mt-7">
            {/* <div className='flex flex-col justify-center gap-4 items-center'>
              <h1 className=' abe text-2xl md:text-4xl text-center md:text-start '>Welcome to YouTooArt Where</h1>
              <h1 className=' abe text-4xl text-center md:text-start'>Creativity Finds Its Canvas</h1>
            </div> */}
            {/* <p className=' abe md:mt-10 mt-4 text-center'>
              At YouTooArt, we believe that every artistic journey is unique and deserves a platform to flourish. Welcome to a community where creativity knows no bounds, and collaboration transforms dreams into masterpieces.
              Get Started
            </p> */}
            {/* <button className='p-3 border rounded-3xl border-gray-600 mt-7 mb-10 md:mb-20'>Get Started</button> */}
          </div>
        </div>
      </div>

      <div className="land3">
        <div className="md:m-20 mx-3 pb-10 md:w-[80%] md:mb-10 md:flex">
          <div className="">
            <h1 className="segoe change text-[45px] text-start lg:text-6xl">
              Find The Right Talent
            </h1>
            <p className="change mt-5 md:mt-10 text-start lg:text-xl">
              Find the right talent for your new project.
            </p>
          </div>
        </div>
        <div className="w-full p-2">
          <IndustryPage landingtalent={landingtalent} />
        </div>
        <button onClick={handleTalent} className="p-3 mb-10 rounded-3xl mt-20 border border-black ml-3 md:text-base text-xl md:ml-20">
          Discover More
        </button>
      </div>

      <div className="land4  flex flex-col justify-center bg-[#F4F4F4]">
        <div className="md:mx-20  ml-3 my-10 md:w-[80%] pt-8 pb-8 md:pb-0 md:pt-20 lg:w-[80%]">
          <div className="">
            <h1

              className="segoe text-[45px] text-start lg:text-6xl">
              Find The Right Casting Call
            </h1>
            <p className="change mt-6 md:mt-10 lg:text-xl text-start">
              Find the latest casting calls and apply for the roles that match
              your skills.
            </p>
          </div>
        </div>
        <div className="w-full">
          <LandingPagetalent landingpage={landingtalent} />
        </div>
        <button onClick={handleCalls} className="segoe p-3 mb-10 lg:mb-20 rounded-full md:rounded-3xl mt-[-60px]  border w-40 md:w-36  border-black md:ml-20 ml-3 md:text-base text-xl text-nowrap">
          Discover More
        </button>
      </div>

      <div
        id="how-it-works"
        className="land5">
        <div className="md:m-20 md:mt-0 mt-20 m-3">
          <h1
            className="segoe change md:mt-5 text-[42px] lg:text-6xl  text-start md:text-4xl">
            How it Works
          </h1>
        </div>
        <div className="data md:m-20 m-3 md:flex md:w-[80%]">
          <div className="left md:block hidden md:w-1/2">
            <img className="w-[95%] h-[98%]" src={land5img} alt="" />
          </div>
          <div className="right md:mt-0 mt-16 md:w-1/2 flex flex-col gap-5 lg:ml-10">
            <div className="border-b block flex-col gap-2 border-gray-300">
              <h1 className="segoe text-[28px] font-semibold change md:text-2xl">
                Craft Your Identity,Share Your Passion
              </h1>
              <p className="segoe text-[20px] md:text-base change text-[#7E8B9A]  mb-4">
                Your artistic journey begins with YouTooArt's personalized
                profile
              </p>
            </div>
            <div className="border-b flex flex-col gap-2 border-gray-300">
              <h1 className="segoe text-[28px] font-semibold change md:text-2xl">
                Discover, Apply, Shine.
              </h1>
              <p className="segoe text-[20px] md:text-base change text-[#7E8B9A] mb-4">
                Unlock a world of opportunities through CineTroop's diverse
                casting calls. From indie projects to collaborations with ren
              </p>
            </div>
            <div>
              <h1 className="segoe text-[28px] font-semibold change md:text-2xl flex flex-col gap-2">
                Connect, Collaborate, Create.
              </h1>
              <p className="segoe change text-[20px] md:text-base text-[#7E8B9A] mb-4">
              CineTroop revolutionizes artistic collaboration with powerful
                tools. Seamlessly connect with fellow artists, discuss projects
              </p>

              <Link to="/login">
                <button className="segoe md:mb-0 mb-16  md:text-base text-xl change p-3 border rounded-full md:rounded-3xl border-black mt-7">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="land6 bg-[#F4F4F4]">
        <div className="md:m-20 m-3 pt-20 text-[45px] md:text-4xl md:pt-7">
          <h1 className="segoe ">FAQ</h1>
        </div>
        <div className="details border-t flex flex-col border-gray-300 md:m-20">
          <div
            onClick={() => handleVisible(0)}
            className="one mt-20 border-b border-gray-300 flex w-full"
          >
            <div className="change md:block hidden number w-[20%]">01</div>
            <div className="data md:w-[60%] w-full md:m-0 ml-3 cursor-pointer">
              <h1 className="segoe md:text-xl text-[24px] font-semibold mb-4">
                What is CineTroop.com about?
              </h1>
              {visibleSections[0] && (
                <p className="segoe 2xl:text-xl change text-base md:text-sm mb-4 text-gray-500">
                  CineTroop.com is an online networking platform that allows
                  people of various artistic interests to communicate,
                  collaborate and come up with their own artworks.
                </p>
              )}
            </div>
            <div className="w-[20%] flex  items-center justify-end md:items-start">
              {!visibleSections[0] ? (
                <button onClick={() => handleVisible(0)} className="change md:mt-0 mt-2 md:mr-0 mr-4 ">
                  <img onClick={() => handleVisible(0)} className="w-[90%]" src={land6plus} alt="" />
                </button>
              ) : (
                <button onClick={() => handleVisible(0)} className="change md:mt-0 mt-2 md:mr-0 mr-4 ">
                  <img onClick={() => handleVisible(0)} className="w-[90%]" src={land6minus} alt="" />
                </button>
              )}
            </div>
          </div>

          <div
            onClick={() => handleVisible(1)}
            className="cursor-pointer two mt-7 border-b border-gray-300 flex w-full"
          >
            <div className="change md:block hidden number w-[20%]">02</div>
            <div className="data md:w-[60%] w-full md:m-0 ml-3 cursor-pointer">
              <h1 className="segoe  md:text-xl text-[24px] font-semibold mb-4">
                How does CineTroop.com work?
              </h1>
              {visibleSections[1] && (
                <p className="segoe 2xl:text-xl change text-base md:text-sm mb-4 text-gray-500">
                  CineTroop.com is an online networking platform that allows
                  people of various artistic interests to communicate,
                  collaborate and come up with their own artworks.
                </p>
              )}
            </div>
            <div className="w-[20%] flex  items-center justify-end md:items-start">
              {!visibleSections[1] ? (
                <button onClick={() => handleVisible(1)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img onClick={() => handleVisible(1)} className="w-[90%]" src={land6plus} alt="" />
                </button>
              ) : (
                <button onClick={() => handleVisible(1)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img onClick={() => handleVisible(1)} className="w-[90%]" src={land6minus} alt="" />
                </button>
              )}
            </div>
          </div>

          <div
            onClick={() => handleVisible(2)}
            className="cursor-pointer three mt-7 border-b border-gray-300 flex w-full"
          >
            <div className=" number md:block hidden number w-[20%]">03</div>
            <div className="data md:w-[60%] w-full md:m-0 ml-3 cursor-pointer">
              <h1 className="segoe md:text-xl text-[24px] font-semibold mb-4">
                How does CineTroop.com help a certain user with a particular
                interest in some art category?
              </h1>
              {visibleSections[2] && (
                <p className="segoe 2xl:text-xl change text-base md:text-sm mb-4 text-gray-500">
                  CineTroop.com is an online networking platform that allows
                  people of various artistic interests to communicate,
                  collaborate and come up with their own artworks.
                </p>
              )}
            </div>
            <div className="w-[20%] flex  items-center justify-end md:items-start">
              {!visibleSections[2] ? (
                <button onClick={() => handleVisible(2)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img onClick={() => handleVisible(2)} className="w-[90%]" src={land6plus} alt="" />
                </button>
              ) : (
                <button onClick={() => handleVisible(2)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img onClick={() => handleVisible(2)} className="w-[90%]" src={land6minus} alt="" />
                </button>
              )}
            </div>
          </div>

          <div
            onClick={() => handleVisible(3)}
            className="cursor-pointer four mt-7 border-b border-gray-300 flex w-full"
          >
            <div className=" number md:block hidden number w-[20%]">04</div>
            <div className="data md:w-[60%] w-full md:m-0 ml-3 cursor-pointer">
              <h1 className="segoe md:text-xl text-[24px] font-semibold mb-4">
                How does CineTroop.com help people who are trying to perceive a
                full-time career in arts?
              </h1>
              {visibleSections[3] && (
                <p className="segoe 2xl:text-xl change text-base md:text-sm mb-4 text-gray-500">
                  CineTroop.com is an online networking platform that allows
                  people of various artistic interests to communicate,
                  collaborate and come up with their own artworks.
                </p>
              )}
            </div>
            <div className="w-[20%] flex  items-center justify-end md:items-start">
              {!visibleSections[3] ? (
                <button onClick={() => handleVisible(3)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img onClick={() => handleVisible(3)} className="w-[90%]" src={land6plus} alt="" />
                </button>
              ) : (
                <button onClick={() => handleVisible(3)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img onClick={() => handleVisible(3)} className="w-[90%]" src={land6minus} alt="" />
                </button>
              )}
            </div>
          </div>

          <div
            onClick={() => handleVisible(4)}
            className="cursor-pointer md:mb-0 mb-16 five mt-7 border-b border-gray-300 flex w-full"
          >
            <div className=" number md:block hidden number w-[20%]">05</div>
            <div className="data md:w-[60%] w-full md:m-0 ml-3 cursor-pointer">
              <h1 className="segoe md:text-xl text-[24px] font-semibold mb-4">
                Anything else from CineTroop.com?
              </h1>
              {visibleSections[4] && (
                <p className="segoe 2xl:text-xl change text-base md:text-sm mb-4 text-gray-500">
                  CineTroop.com is an online networking platform that allows
                  people of various artistic interests to communicate,
                  collaborate and come up with their own artworks.
                </p>
              )}
            </div>
            <div className="w-[20%] flex  items-center justify-end md:items-start">
              {!visibleSections[4] ? (
                <button onClick={() => handleVisible(4)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img className="w-[90%]" src={land6plus} alt="" />
                </button>
              ) : (
                <button onClick={() => handleVisible(4)} className="change md:mt-0 mt-2 md:mr-0 mr-4">
                  <img className="w-[90%]" src={land6minus} alt="" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="land7 flex flex-col-reverse  md:flex-row md:flex md:m-20">
        <div className="left md:w-1/2 ">
          <img className="md:px-20 hidden md:block w-[481px] h-[600px] object-contain md:w-full" src={land7img} alt="" />
          <div className="flex justify-end">
            <img className="md:hidden  flex  w-[96%]" src={MockupHandR} alt="" />
          </div>
        </div>
        <div className="right flex justify-center w-full items-center p-3 md:w-1/2">
          <div className="flex flex-col items-center">
            <h1 className="segoe text-[45px] md:mt-0 mt-20 lg:text-6xl text-center md:text-start md:w-[60%]">
              Download The CineTroop App
            </h1>
            <p className="change lg:text-xl md:text-start text-center text-wrap md:text-base text-[20px] md:w-[60%] text-gray-500 mt-3">
              Elevate your artistry with the CineTroop app. Download now to
              explore casting calls, connect with fellow artists, and
              collaborate on the go. Your masterpiece awaits – take the first
              step.
            </p>
            <div className="flex justify-center md:mt-0 mt-[242%] md:static w-full absolute md:justify-start md:w-[60%] gap-4">
              <a
                href="https://apps.apple.com"
                target="_blank"
                className="md:w-[40%] w-[45%] shadow-xl"
              >
                <img src={appstore} className="" alt="" />
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                className="md:w-[40%] w-[45%] shadow-xl"

              >
                <img src={playstore} className="" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="land8 bg-[#F4F4F4]">
        <div className="md:mx-20 flex justify-center items-center flex-col ">
          <img className="md:w-[35%] md:pt-2 pt-10 w-[55%]" src={land8img} alt="" />
          <div className="flex justify-center items-center flex-col mt-8">
            <h1 className=" segoe md:mx-0 mx-3 md:text-4xl  2xl:text-5xl text-[38px] md:w-[70%] text-center">
              Connect with Us – Let's Shape Your YouTooArt Experience.
            </h1>
            <p className=" segoe md:text-base text-[20px]  lg:mt-8 mt-5 md:m-0 m-10 2xl:text-xl text-center md:text-start">
              Have questions, suggestions, or need assistance? We're here for
              you!
            </p>
          </div>
          <div>
            <div className="md:mt-10 mb-20">
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                className="segoe md:text-base text-xl p-3 border 2xl:text-xl rounded-full  border-gray-600 mt-7 mb-20">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Landingpage;
