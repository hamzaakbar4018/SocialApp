import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegWindowMinimize } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

const Chatpopup = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 1520, y: 600 });
  const [expanded, setExpanded] = useState(false);
  const [isOverCloseZone, setIsOverCloseZone] = useState(false);
  const controls = useAnimation();
  const closeIconControls = useAnimation();

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event, info) => {
    const closeZone = document.getElementById("close-zone");
    if (closeZone) {
      const closeZoneRect = closeZone.getBoundingClientRect();
      const isOver =
        info.point.x >= closeZoneRect.left &&
        info.point.x <= closeZoneRect.right &&
        info.point.y >= closeZoneRect.top &&
        info.point.y <= closeZoneRect.bottom;

      setIsOverCloseZone(isOver);

      if (isOver) {
        closeZone.style.scale = 1.5;
        closeZone.style.opacity = 0.5;
      } else {
        closeZone.style.scale = 1;
        closeZone.style.opacity = 1;
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (isOverCloseZone) {
      handleClose();
    }
    setIsOverCloseZone(false);
    closeIconControls.stop();
    closeIconControls.set({ scale: 1 });
  };

  const handleClick = () => {
    if (!isDragging) {
      setExpanded(!expanded);
    }
  };

  const handleClose = () => {
    controls.start({ scale: 0, opacity: 0 });
  };

  useEffect(() => {
    controls.start({ scale: 1, opacity: 1 });
  }, []);

  return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ position: "fixed", left: position.x, top: position.y }}
      >
        <motion.div
          className={`rounded-full overflow-hidden cursor-move ${
            expanded ? "hidden" : "flex flex-row-reverse"
          } items-center justify-center w-12 h-12`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
        >
          <div className="avatar">
            <div className="w-16">
              <img
                draggable="false"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
        </motion.div>
        {expanded && (
          <motion.div
            className="bg-white rounded-lg shadow-lg w-64 h-80 flex flex-col"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: 1, x: -250, y: -250 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="bg-blue-500 text-white p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {/* Avatar */}
                <div className="avatar online">
                  <div className="w-10 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <span className="">Name</span>
              </div>
              <motion.button
                onClick={() => setExpanded(false)}
                className="text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaRegWindowMinimize size={20} />
              </motion.button>
            </div>
            <div className="flex-grow p-2 overflow-y-auto">
              <div className="chat chat-start">
                <div className="chat-bubble bg-[#399AF3] text-white">
                  What kind of nonsense is this
                </div>
              </div>
            </div>
            <div className="p-2 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border rounded"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
      {isDragging && (
        <motion.div
          id="close-zone"
          className={`fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-red-500 text-white rounded-full z-50 p-2 cursor-pointer ${
            isOverCloseZone ? "scale-110" : ""
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoMdClose size={20} />
        </motion.div>
      )}
    </>
  );
};

export default Chatpopup;
