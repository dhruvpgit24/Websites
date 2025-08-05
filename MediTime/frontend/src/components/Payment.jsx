import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const appointment = state?.appointment;

  const [method, setMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [upiId, setUpiId] = useState("");

  const handleFakePayment = () => {
    if (
      (method === "card" &&
        (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) ||
      (method === "upi" && !upiId)
    ) {
      toast.error("Please fill in all payment fields.");
      return;
    }

    toast.success("Payment Successful!");
    navigate("/my-appointments");
  };

  if (!appointment) {
    return (
      <p className="text-center mt-20 text-red-500">Invalid appointment</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#ffffff] to-[#fcfaff] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-3xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#9708CC]">
          Payment Details
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800">
          <p><strong>Doctor:</strong> {appointment.docId?.name}</p>
          <p><strong>Speciality:</strong> {appointment.docId?.speciality}</p>
          <p><strong>Date & Time:</strong> {appointment.slotDate.replaceAll("_", "/")} | {appointment.slotTime}</p>
          <p><strong>Amount:</strong> ₹{appointment.amount || 500}</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setMethod("card")}
            className={`w-1/2 py-2 rounded-full font-semibold ${
              method === "card"
                ? "bg-[#9708CC] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Card
          </button>
          <button
            onClick={() => setMethod("upi")}
            className={`w-1/2 py-2 rounded-full font-semibold ${
              method === "upi"
                ? "bg-[#9708CC] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            UPI
          </button>
        </div>

        {method === "card" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              maxLength="16"
              className="w-full border p-3 rounded-lg outline-[#9708CC]"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
              }
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 border p-3 rounded-lg outline-[#9708CC]"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="CVV"
                maxLength="3"
                className="w-1/2 border p-3 rounded-lg outline-[#9708CC]"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {method === "upi" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., you@upi)"
              className="w-full border p-3 rounded-lg outline-[#9708CC]"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={handleFakePayment}
          className="w-full bg-[#9708CC] hover:bg-[#7c06b1] text-white py-3 rounded-full font-semibold"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
