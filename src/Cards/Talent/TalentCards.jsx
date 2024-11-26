import { IoMailOutline } from "react-icons/io5";
// const TalentCards = ({ userpic, name, text, connect, landingtalent, network }) => {
const TalentCards = ({ image, firstName, categoryName, connect, landingtalent, network }) => {
  return (
    <div className="md:overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-2xl p-5 h-auto w-[255px] 
        ${network && 'md:min-w-[255px] h-auto w-auto'} 
        ${landingtalent && '2xl:min-h-[433px] md:min-w-auto md:h-auto h-[340px] w-[300px] 2xl:min-w-[356px]'} 
        ${connect && 'w-[222px] tracking-tighter'} 
        min-h-min h-[250px] `}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          {landingtalent ? (
            <div className="flex md:gap-0 gap-2 flex-col mt-3 justify-center items-center">
              <img
                src={image}
                className="rounded-full w-20 h-20 2xl:w-40 2xl:h-40"
                alt="User img"
              />
              <h2 className="2xl:mt-8  mt-4 2xl:text-2xl font-bold text-center">{firstName}</h2>
              {
                categoryName.map((cat, index) => (
                  <p key={index} className="text-gray-400 2xl:mt-5 2xl:text-xl  text-center">{cat}</p>

                ))
              }
            </div>
          ) : (
            <div>
              <div className="flex-shrink-0">
              <img
                src={image}
                className="rounded-full w-20 h-20 object-cover"
                alt="User img"
              />
              </div>
              <h2 className="mt-2  text-lg font-bold">{firstName}</h2>
              {/* <p className="text-gray-400 text-wrap">{categoryName}</p> */}
              <div className="flex flex-wrap gap-2">
                {categoryName.map((cat, index) => (
                  <p key={index} className="text-gray-400">
                    {cat}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mt-auto">
            <button className={`bg-black ${landingtalent ? '2xl:min-w-[248px] w-full 2xl:text-2xl 2xl:mt-5' : 'w-full text-nowrap rounded-full px-3 tracking-tighter'} rounded-3xl text-white py-2`}>
              {!connect ? "Connect" : "Remove"}
            </button>
            {landingtalent ? (
              <div className="rounded-full border 2xl:mt-5 p-2 ml-3">
                <IoMailOutline className="2xl:text-4xl text-3xl" />
              </div>
            ) : (
              <div className="ml-3 mr-3 p-2 border border-gray-400 rounded-full flex justify-center items-center">
                <IoMailOutline className="text-2xl" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default TalentCards;
