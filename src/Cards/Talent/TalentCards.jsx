import { IoMailOutline } from "react-icons/io5";
const TalentCards = ({ userpic, name, text , connect }) => {
  return (
    <div className="overflow-hidden">
      <div className={`bg-[#ECF5FE] rounded-lg p-5 w-[228px] ${connect && 'w-[222px] tracking-tighter'} min-h-min h-[250px]`}>
        <div className="flex flex-col gap-3 space-y-2 h-full">
          <div>
            <img
              src={userpic}
              className="rounded-full w-20 h-20"
              alt="User Image"
            />
            <h2 className="mt-2 text-lg text-nowrap font-bold">{name}</h2>
            <p className="text-gray-400">{text}</p>
          </div>
          <div className="flex justify-start gap-3 items-center">
            <button className={`bg-black text-nowrap w-full  rounded-3xl text-white py-2`}>
              {
                !connect ? "Connect" : "Remove Connection"
              }
            </button>
            <IoMailOutline className="text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;
