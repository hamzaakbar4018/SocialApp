import { IoMailOutline } from "react-icons/io5";
const TalentCards = ({ userpic, name, text }) => {
  return (
    <div className="overflow-hidden">
      <div className="bg-white rounded-lg p-5 w-[228px] min-h-min h-[250px]">
        <div className="flex flex-col justify-between space-y-2 h-full">
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
            <button className="bg-black rounded-3xl text-white px-3 py-2">
              Connect
            </button>
            <IoMailOutline className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;
