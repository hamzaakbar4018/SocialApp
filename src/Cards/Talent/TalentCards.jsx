import { IoMailOutline } from "react-icons/io5";

const TalentCards = ({ userpic, name, text, connect, landingtalent }) => {
  return (
    <div className="overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-2xl p-5 w-[255px] ${landingtalent && '2xl:min-h-[433px] 2xl:min-w-[356px]'} ${connect && 'w-[222px] tracking-tighter'} min-h-min h-[250px]`}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          {landingtalent ? (
            <div className="flex flex-col mt-3 justify-center items-center">
              <img
                src={userpic}
                className="rounded-full w-16 h-16  2xl:w-40 2xl:h-40"
                alt="User"
              />
              <h2 className="2xl:mt-8 mt-4 2xl:text-2xl font-bold text-center">{name}</h2>
              <p className="text-gray-400 2xl:mt-5 2xl:text-xl text-center">{text}</p>
            </div>
          ) : (
            <div>
              <img
                src={userpic}
                className="rounded-full w-20 h-20"
                alt="User"
              />
              <h2 className="mt-2 text-lg font-bold">{name}</h2>
              <p className="text-gray-400">{text}</p>
            </div>
          )}
          <div className="flex justify-between items-center mt-auto">
            <button className={`bg-black ${landingtalent ? '2xl:min-w-[248px] w-full 2xl:text-2xl 2xl:mt-5' : 'w-full text-nowrap rounded-full px-3 tracking-tighter'} rounded-3xl text-white py-2`}>
              {!connect ? "Connect" : "Remove Connection"}
            </button>
            {landingtalent ? (
              <div className="rounded-full border 2xl:mt-5 p-2 ml-3">
                <IoMailOutline className="2xl:text-4xl text-3xl" />
              </div>
            ) : (
              <div className="ml-3 p-1 border border-gray-400 rounded-full flex justify-center items-center">

                <IoMailOutline className="text-4xl " />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;
