import React from 'react';
import { FaBan } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const TransacctionCard = ({ approve, date, price, title, id, time }) => {
    return (
        <div className="rounded-lg bg-white p-4">
            <div className="flex justify-between items-center text-gray-400">
                <h1>{date}</h1>
                <h1 className='text-[#http://54.153.208.108]'>{price}</h1>
            </div>
            <div className="flex gap-3 mt-3 items-start">
                {
                    approve ? 
                    <TiTick className='bg-[#B3FCE2] p-2 text-5xl rounded-full text-[#008F5C]' /> : 
                    <FaBan className='text-5xl p-2 rounded-full bg-[#FFE5E5] text-red-500' />
                }
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h1 className='text-xl font-semibold'>{title}</h1>
                        <h2 className={approve ? 'text-[#008F5C] font-bold' : 'text-[#FF6B6B] font-bold'}>{price}</h2>

                    </div>
                    <p className=' text-[#399AF3]'>{id}</p>
                    <p className=' text-gray-400'>{time}</p>
                </div>
            </div>
        </div>
    );
}

export default TransacctionCard;
