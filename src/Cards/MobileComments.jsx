import React, { useEffect } from 'react';
import { ImSpinner2 } from "react-icons/im";

const MobileComments = ({
    comments,
    isLoadingPost,
    setNewComment,
    isLoading,
    handlePostComment,
    newComment,
    setMobileComments,
    error,
    setError,
    fetchComments,
    Author
}) => {
    const commentsArray = Array.isArray(comments) ? comments : [];

    useEffect(() => {
        if (fetchComments) {
            fetchComments();
        }
    }, []);

    return (
        <div className="fixed inset-0 md:hidden block z-40 top-0 right-0 bg-black bg-opacity-50">
            <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box p-0 max-h-[90vh]">
                    <form method="dialog" className="sticky px-2 py-2 bg-white top-0 flex justify-between border-b">
                        <h3 className="font-bold p-4 text-lg">
                            Post Comments ({commentsArray.length})
                        </h3>
                        <button
                            type="button"
                            onClick={() => setMobileComments(false)}
                            className="btn btn-sm btn-circle p-5 btn-ghost"
                        >
                            ✕
                        </button>
                    </form>

                    <div className="flex flex-col p-4 pb-20 overflow-y-auto">
                        {
                            commentsArray.length === 0 ? (
                                <div className="text-center text-gray-500 py-4">
                                    No comments yet. Be the first to comment!
                                </div>
                            ) : (
                                commentsArray.map((commentData) => (
                                    <div key={commentData.id || Math.random()} className="mb-4">
                                        <div className="flex items-center font-bold gap-2">
                                            <img
                                                src={commentData.userImage || Author?.image || '/default-avatar.png'}
                                                className="w-10 h-10 rounded-full object-cover"
                                                alt={commentData.userName || Author?.firstName || 'User'}
                                            />
                                            <h1 className="text-sm">{commentData.userName || Author?.firstName || 'Anonymous'}</h1>
                                        </div>
                                        <p className="bg-[#B7B8B954] py-1 px-2 my-2 rounded-tr-xl rounded-br-xl rounded-bl-xl">
                                            {commentData.comment}
                                        </p>
                                    </div>
                                ))
                            )}
                    </div>


                    <div className="flex fixed bottom-0 left-0 w-full bg-white px-4 py-3 gap-2 justify-center items-center border-t">
                        <input
                            className="bg-[#1C1C1C14] w-[70%] p-2 rounded-2xl"
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => {
                                setNewComment(e.target.value);
                                if (setError) {
                                    setError(null);
                                }
                            }}
                            disabled={isLoading}
                        />
                        <button
                            className={`rounded-3xl p-2 text-white font-bold text-nowrap ${isLoading || !newComment?.trim() ? 'bg-gray-400' : 'bg-black'
                                }`}
                            onClick={handlePostComment}
                            disabled={isLoading || !newComment?.trim()}
                        >
                            {isLoadingPost ? (
                                <div className="flex justify-center items-center gap-1">
                                    <ImSpinner2 className="animate-spin" />
                                    <span>Posting...</span>
                                </div>
                            ) : (
                                'Post Now'
                            )}
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MobileComments;