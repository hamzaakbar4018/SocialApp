import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import land1 from '../assets/Images/land1.png'
import land2 from '../assets/Images/land2.png'
import appstore from '../assets/Images/appstore.png'
import playstore from '../assets/Images/playstore.png'
import land5img from '../assets/Images/land5img.png'
import Land4card from '../Cards/Land4card';
import land6plus from '../assets/Images/land6plus.svg'
import land6minus from '../assets/Images/land6minus.svg'
import land7img from '../assets/Images/land7img.png'
import land8img from '../assets/Images/land8img.png'
import Footer from '../components/Footer'
import IndustryData from "../Cards/IndustryData";
import '../CSS/Landingpage.css'
import LandingPagetalent from '../Cards/LandingPagetalent'
const Landingpage = () => {
  // const data = [
  //   {
  //     title: "Seeking Actor for a Short Film",
  //     img: land4cardimg,
  //     username: "Hamza Akbar",
  //     description: "We're looking for the talented actors for our upcoming short film.",
  //     location: "Islamabad",
  //     type: "Short Film",
  //     shoot: "25 Days",
  //     budget: "$25K"
  //   }
  // ]

  const [visibleSections, setVisibleSections] = useState([false, false, false, false, false, false]);

  const handleVisible = (index) => {
    setVisibleSections(prevState =>
      prevState.map((visible, i) => i === index ? !visible : visible)
    );
  };
  return (
    <div className='land md:w-full  '>
      <Navbar />
      <div className="land1 flex-col-reverse flex md:flex md:flex-row p-10 mt-5">
        <div className="left md:ml-8 md:w-1/2">
          <h1 className='change text-xl mt-4 text-center md:text-start md:text-4xl lg:text-6xl'>
            Connect, Collaborate, Create:
          </h1>
          <h1 className=' change text-3xl text-center md:text-start md:text-4xl lg:text-6xl mt-3'>
            <span className='text-[#FC3F3F]'>
              YouTooArt
            </span>-Your Artistic Marketplace.
          </h1>
          <p className=' change mt-5 md:text-xl text-center md:text-start text-[#252525]'>Empowering artistis to forge meaningful connections and bring creative visions to life.Join the artistic revolution at YouTooArt.</p>
          <div className='flex justify-center items-center md:justify-start'><button className='p-3 border rounded-3xl border-gray-600 mt-7'>Get Started</button></div>
          <div className='flex gap-4 mt-44'>
            <img src={appstore} className='w-[18%]' alt="" />
            <img src={playstore} className='w-[18%]' alt="" />
          </div>
        </div>
        <div className="right md:w-1/2">
          <img className='md:w-[88%]' src={land1} alt="" />
        </div>
      </div>

      <div className="land2 flex flex-col">
        <div className="w-[100%] mt-10 md:mt-32">
          <img src={land2} alt="image" />
          <div className='flex flex-col justify-center items-center mt-7'>
            {/* <div className='flex flex-col justify-center gap-4 items-center'>
              <h1 className=' change text-2xl md:text-4xl text-center md:text-start '>Welcome to YouTooArt Where</h1>
              <h1 className=' change text-4xl text-center md:text-start'>Creativity Finds Its Canvas</h1>
            </div> */}
            {/* <p className=' change md:mt-10 mt-4 text-center'>
              At YouTooArt, we believe that every artistic journey is unique and deserves a platform to flourish. Welcome to a community where creativity knows no bounds, and collaboration transforms dreams into masterpieces.
              Get Started
            </p> */}
            {/* <button className='p-3 border rounded-3xl border-gray-600 mt-7 mb-10 md:mb-20'>Get Started</button> */}
          </div>
        </div>
      </div>

      <div className="land3 ">
        <div className='m-20 md:w-[80%] md:mb-10 md:flex'>
          <div className="">
            <h1 className=' change text-4xl lg:text-6xl'>Find The Right Talent</h1>
            <p className=' change mt-10 text-center md:text-start lg:text-xl'>Find the right talent for your new project.</p>
          </div>
        </div>
        <div className='flex lg:pl-10'>
          <IndustryData />

        </div>
        <button className='p-3 rounded-3xl mt-14 border border-black ml-20'>Discover More</button>
      </div>

      <div className="land4  flex flex-col justify-center bg-[#F4F4F4]">
        <div className='m-20 pt-8 pb-8 md:pb-0 md:pt-20 lg:w-[80%]'>
          <div className=''>
          <h1 className='text-4xl lg:text-6xl'>Find The Right Casting Call</h1>
          <p className='change  mt-10 lg:text-xl text-center md:text-start'>Find the latest casting calls and apply for the roles that match your skills.</p>
          </div>
        </div>
        <div className='w-full lg:pl-20 flex justify-center'>
          <LandingPagetalent />
        </div>
        <button className='p-3 rounded-3xl mt-14 border w-36 border-black ml-20'>Discover More</button>


      </div>

      <div className="land5">
        <div className='m-20'>
          <h1 className=' change  text-2xl lg:text-6xl text-center md:text-start md:text-4xl'>How it Works</h1>
        </div>
        <div className="data md:m-20 m-10 md:flex md:w-[80%]">
          <div className="left md:w-1/2">
            <img src={land5img} alt="" />
          </div>
          <div className="right md:w-1/2 flex flex-col gap-5 lg:ml-10">
            <div className='border-b hidden md:block flex-col gap-2 border-gray-300'>
              <h1 className=' change text-2xl'>Craft Your Identity,Share Your Passion</h1>
              <p className=' change text-[#7E8B9A]  mb-4'>Your artistic journey begins with YouTooArt's personalized profile</p>
            </div>
            <div className='border-b flex flex-col gap-2 border-gray-300'>
              <h1 className=' change text-2xl'>Discover, Apply, Shine.</h1>
              <p className=' change text-[#7E8B9A] mb-4'>Unlock a world of opportunities through YouTooArt's diverse casting calls. From indie projects to collaborations with ren</p>
            </div>
            <div>
              <h1 className=' change text-2xl flex flex-col gap-2'>Connect, Collaborate, Create.</h1>
              <p className=' change text-[#7E8B9A] mb-4'>YouTooArt revolutionizes artistic collaboration with powerful tools. Seamlessly connect with fellow artists, discuss projects</p>

              <button className=' change p-3 border rounded-3xl border-gray-600 mt-7'>Get Started</button>
            </div>
          </div>
        </div>
      </div>


      <div className="land6 bg-[#F4F4F4]">
        <div className='m-20 pt-7 text-4xl'>
          <h1>FAQ</h1>
        </div>
        <div className="details border-t flex flex-col border-gray-300 m-20">
          <div className="one mt-20 border-b border-gray-300 flex w-full">
            <div className="change number w-[20%]">
              01
            </div>
            <div className="data w-[60%]">
              <h1 className='change text-xl mb-4'>What is youtooart.com about?</h1>
              {visibleSections[0] && <p className='change text-sm mb-4 text-gray-500'>
                Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
              </p>}
            </div>
            <div className="w-[20%] flex justify-end items-start">
              {!visibleSections[0] ?
                <button onClick={() => handleVisible(0)} className='change '><img className='w-[90%]' src={land6plus} alt="" /></button> :
                <button onClick={() => handleVisible(0)} className='change '><img className='w-[90%]' src={land6minus} alt="" /></button>
              }
            </div>
          </div>

          <div className="two mt-7 border-b border-gray-300 flex w-full">
            <div className="change number w-[20%]">
              02
            </div>
            <div className="data w-[60%]">
              <h1 className='change text-xl mb-4'>How does youtooart.com work?</h1>
              {visibleSections[1] && <p className='change text-sm mb-4 text-gray-500'>
                Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
              </p>}
            </div>
            <div className="w-[20%] flex justify-end items-start">
              {!visibleSections[1] ?
                <button onClick={() => handleVisible(1)} className='change '><img className='w-[90%]' src={land6plus} alt="" /></button> :
                <button onClick={() => handleVisible(1)} className='change '><img className='w-[90%]' src={land6minus} alt="" /></button>
              }
            </div>
          </div>

          <div className="three mt-7 border-b border-gray-300 flex w-full">
            <div className="change number w-[20%]">
              03
            </div>
            <div className="data w-[60%]">
              <h1 className='change text-xl mb-4'>How does youtooart.com help a certain user with a particular interest in some art category?</h1>
              {visibleSections[2] && <p className='change text-sm mb-4 text-gray-500'>
                Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
              </p>}
            </div>
            <div className="w-[20%] flex justify-end items-start">
              {!visibleSections[2] ?
                <button onClick={() => handleVisible(2)} className='change '><img className='w-[90%]' src={land6plus} alt="" /></button> :
                <button onClick={() => handleVisible(2)} className='change '><img className='w-[90%]' src={land6minus} alt="" /></button>
              }
            </div>
          </div>

          <div className="four mt-7 border-b border-gray-300 flex w-full">
            <div className="change number w-[20%]">
              04
            </div>
            <div className="data w-[60%]">
              <h1 className='change text-xl mb-4'>How does youtooart.com help people who are trying to perceive a full-time career in arts?</h1>
              {visibleSections[3] && <p className='change text-sm mb-4 text-gray-500'>
                Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
              </p>}
            </div>
            <div className="w-[20%] flex justify-end items-start">
              {!visibleSections[3] ?
                <button onClick={() => handleVisible(3)} className='change '><img className='w-[90%]' src={land6plus} alt="" /></button> :
                <button onClick={() => handleVisible(3)} className='change '><img className='w-[90%]' src={land6minus} alt="" /></button>
              }
            </div>
          </div>

          <div className="five mt-7 border-b border-gray-300 flex w-full">
            <div className="change number w-[20%]">
              05
            </div>
            <div className="data w-[60%]">
              <h1 className='change text-xl mb-4'>Anything else from Youtooart.com?</h1>
              {visibleSections[4] && <p className='change text-sm mb-4 text-gray-500'>
                Youtooart.com is an online networking platform that allows people of various artistic interests to communicate, collaborate and come up with their own artworks.
              </p>}
            </div>
            <div className="w-[20%] mb-20 flex justify-end items-start">
              {!visibleSections[4] ?
                <button onClick={() => handleVisible(4)} className='change '><img className='w-[90%]' src={land6plus} alt="" /></button> :
                <button onClick={() => handleVisible(4)} className='change '><img className='w-[90%]' src={land6minus} alt="" /></button>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="land7 hidden md:block md:flex m-20">
        <div className="left w-1/2">
          <img className='px-20 md:w-full w-20' src={land7img} alt="" />
        </div>
        <div className="right flex justify-center items-center p-3 w-1/2">
          <div className='flex flex-col items-center text-center'>
            <h1 className='change text-4xl lg:text-6xl w-[60%]'>
              Download The YouTooArt App
            </h1>
            <p className='change lg:text-xl text-wrap w-[60%] text-gray-500 mt-3'>
              Elevate your artistry with the YouTooArt app. Download now to explore casting calls, connect with fellow artists, and collaborate on the go. Your masterpiece awaits – take the first step.
            </p>
            <div className='flex justify-center w-[60%] gap-4 mt-8'>
              <img src={appstore} className='w-[40%]' alt="" />
              <img src={playstore} className='w-[40%]' alt="" />
            </div>
          </div>
        </div>
      </div>


      <div className="land8 bg-[#F4F4F4]">
        <div className='md:m-20 m- flex justify-center items-center flex-col'>
          <img className='w-[35%]' src={land8img} alt="" />
          <div className='flex justify-center items-center flex-col mt-8'>
            <h1 className=' change md:text-4xl text-2xl w-[70%] text-center'>Connect with Us – Let's Shape Your YouTooArt Experience.</h1>
            <p className=' change lg:mt-8 mt-5 md:m-0 m-10 text-center md:text-start'>Have questions, suggestions, or need assistance? We're here for you!</p>
          </div>
          <div>
            <button className=' change p-3 border rounded-3xl border-gray-600 mt-7 mb-20'>Contact Us</button>
          </div>

        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Landingpage