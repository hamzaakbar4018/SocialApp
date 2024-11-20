import React from 'react';
import { FaBan } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const TransacctionCard = ({ isSuccess, createdAt, amount, description, id }) => {

    const formattedDate = createdAt?.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    


    return (


        <div className=" bg-white p-4">
            <div className="flex justify-between items-center text-gray-400">
                <h1>{formattedDate}</h1>
                <h1>${amount}</h1>
            </div>
            <div className="flex gap-3 mt-3 items-start">
                {
                    isSuccess ? 
                    <TiTick className='bg-[#B3FCE2] p-2 text-5xl rounded-full text-[#008F5C]' /> : 
                    <FaBan className='text-5xl p-2 rounded-full bg-[#FFE5E5] text-red-500' />
                }
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h1 className='text-xl font-semibold'>{description}</h1>
                        <h2 className={isSuccess ? 'text-[#008F5C] font-bold' : 'text-[#FF6B6B] font-bold'}>${amount}</h2>

                    </div>
                    <p className=' text-[#399AF3]'>{id.slice(0,6)}</p>
                    <p className=' text-gray-400'>{formattedDate}</p>
                </div>
            </div>
        </div>
    );
}

export default TransacctionCard;
