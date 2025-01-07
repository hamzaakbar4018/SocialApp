import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { FaWhatsapp, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FiCopy } from "react-icons/fi";

const SharePopup = ({ url = "", onClose }) => {
  const [copied, setCopied] = useState(false);
  
  const shareOptions = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      color: "#25D366",
      backgroundColor: "#E8F8ED"
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      color: "#1877F2",
      backgroundColor: "#E7F0FF"
    },
    {
      name: "X",
      icon: FaXTwitter,
      color: "black",
      backgroundColor: "#F1F1F1"
    },
    {
      name: "Email",
      icon: MdEmail,
      color: "#EA4335",
      backgroundColor: "#FFEFEF"
    },
    // {
    //   name: "KakaoTalk",
    //   icon: RiKakaoTalkFill,
    //   color: "black",
    //   backgroundColor: "#FAE100"
    // }
  ];

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    const shareUrls = {
      WhatsApp: `https://wa.me/?text=${encodedUrl}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      X: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      Email: `mailto:?body=${encodedUrl}`,
      KakaoTalk: `https://story.kakao.com/share?url=${encodedUrl}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Share</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex gap-4 mb-8 overflow-x-auto py-2">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option.name)}
              className="flex flex-col items-center gap-2 min-w-[64px]"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: option.backgroundColor }}
              >
                {React.createElement(option.icon, {
                  className: "w-6 h-6",
                  style: { color: option.color }
                })}
              </div>
              <span className="text-sm text-gray-600">{option.name}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 bg-gray-100 rounded-lg p-2">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-transparent text-gray-700 outline-none px-2"
          />
          <button
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
            {!copied && <FiCopy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;