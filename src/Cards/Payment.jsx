import React from 'react';
import { toast } from 'react-toastify';

const Payment = ({ amount, onSuccess, onClose }) => {
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_1trHrUFHsCTIIv',
      amount: amount * 300, // Amount in paise
      currency: "INR",
      name: "Casting Platform",
      description: "Additional Casting Call",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          toast.success('Payment Successful');
          onSuccess(response);
        } else {
          toast.error('Payment Failed');
        }
      },
      modal: {
        ondismiss: function() {
          onClose();
        }
      },
      theme: {
        color: "#3399cc"
      }
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={onClose} 
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
      <button 
        onClick={handlePayment} 
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Pay ₹{amount}
      </button>
    </div>
  );
}

export default Payment;