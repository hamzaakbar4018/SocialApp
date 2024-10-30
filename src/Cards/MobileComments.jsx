import React from 'react';

const MobileComments = ({ mobileComments, setMobileComments, commentsData }) => {
    return (
        <div className='fixed md:hidden block z-40 top-0 right-0 bg-black bg-opacity-90'>
            <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box p-0">
                    <form method="dialog" className='sticky px-2 py-2 bg-white top-0 flex justify-between'>
                        <h3 className='font-bold p-4 text-lg'>Post Comments ({commentsData.length})</h3>
                        <button
                            type="button"
                            onClick={() => setMobileComments(false)}
                            className="btn btn-sm btn-circle p-5 btn-ghost">✕
                        </button>
                    </form>

                    <div className='flex flex-col p-4'>
                        {commentsData.map((data, index) => (
                            <div key={index} className='mb-4'>
                                <div className='flex items-center font-bold gap-2'>
                                    <img src={data.userimage} className='w-10 h-10 rounded-full' alt={data.username} />
                                    <h1 className='text-sm'>{data.username}</h1>
                                </div>
                                <p className='bg-[#B7B8B954] py-1 px-2 my-2 rounded-tr-xl rounded-br-xl rounded-bl-xl'>
                                    {data.comment}
                                </p>
                            </div>
                        ))}
                        <div className='flex sticky bottom-0 left-0 w-full bg-white px-0 py-3 gap-2 justify-center items-center'>
                            <input className='bg-[#1C1C1C14] w-[70%] p-2 rounded-2xl' type="text" placeholder='Add a comment...' />
                            <button className='md:bg-[#A5A5A5] bg-black rounded-3xl p-2 text-white font-bold'>
                                Post Now
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default MobileComments;
