import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Relateddoc from "../components/Relateddoc";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
  } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const fetchDocInfo = () => {
    const found = doctors.find((doc) => doc._id === docId);
    setDocInfo(found || null);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;

    const today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();
        currentDate.setHours(now.getHours() + 1);
        currentDate.setMinutes(now.getMinutes() > 30 ? 0 : 30);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isSlotBooked =
          docInfo?.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isSlotBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push({
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
        timeSlots,
      });
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book Appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex]?.date;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="px-6 md:px-16 py-10">
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="w-full sm:w-1/3">
            <img className="w-full rounded-lg" src={docInfo.image} alt="" />
          </div>
          <div className="flex-1 bg-white shadow-sm rounded-xl p-6">
            <p className="text-2xl font-semibold text-[#2E2E2E] mb-2 flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="w-4" />
            </p>
            <p className="text-[#666] mb-2">
              {docInfo.degree} - {docInfo.speciality}
              <span className="ml-3 text-xs bg-[#f1ecfd] text-[#6C63FF] px-2 py-1 rounded-md">
                {docInfo.experience}
              </span>
            </p>
            <p className="text-[#2E2E2E] font-medium mb-1 flex items-center gap-1">
              About
              <img src={assets.info_icon} alt="" className="w-4" />
            </p>
            <p className="text-sm text-[#666] mb-4 leading-relaxed">
              {docInfo.about}
            </p>
            <p className="text-sm text-[#2E2E2E] font-semibold">
              Appointment fee:{" "}
              <span className="font-bold">
                {docInfo.fees} {currencySymbol}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow px-6 py-8 mb-10">
          <p className="text-xl font-semibold text-[#2E2E2E] mb-4">
            Booking slots
          </p>

          <div className="overflow-x-auto mb-6">
            <div className="flex gap-3 w-max">
              {docSlots.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime(""); // reset slot time when changing day
                  }}
                  key={index}
                  className={`text-center min-w-[70px] px-4 py-2 rounded-full border cursor-pointer transition-all ${
                    slotIndex === index
                      ? "bg-[#6C63FF] text-white"
                      : "bg-[#f5f5f5] text-[#2E2E2E] hover:bg-[#e4dfff]"
                  }`}
                >
                  <p className="text-sm font-semibold">
                    {
                      ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][
                        item.date.getDay()
                      ]
                    }
                  </p>
                  <p className="text-sm">{item.date.getDate()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-3 w-max">
              {docSlots[slotIndex]?.timeSlots.length > 0 ? (
                docSlots[slotIndex].timeSlots.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(item.time)}
                    className={`text-sm px-4 py-2 border rounded-full cursor-pointer whitespace-nowrap transition-all ${
                      item.time === slotTime
                        ? "bg-[#6C63FF] text-white"
                        : "bg-white hover:bg-[#f3ecff]"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No slots available on this day
                </p>
              )}
            </div>
          </div>

          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`mt-6 px-6 py-2 rounded-full text-white transition-all ${
              slotTime
                ? "bg-[#6C63FF] hover:bg-[#5a54d2]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Book an appointment
          </button>
        </div>

        <Relateddoc docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
