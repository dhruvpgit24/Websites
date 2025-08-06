import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { toast } from "sonner";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className="w-full px-4 py-3 mb-4 text-sm border rounded-lg outline-none transition-all duration-300 bg-white dark:bg-[#ecffd7] border-gray-300 focus:ring-2 focus:ring-primary-dark shadow-sm hover:shadow-md"
  />
);

const AddAddress = () => {

  const {axios, user , navigate} = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    try {
      const {data} = await axios.post('/api/address/add',{address})
      if(data.success){
        toast.success(data.message)
        navigate('/cart')
      }else{
        toast.error(data.message)
      }
      e.preventDefault();
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  },[])

  return (
    <div className="mt-16 px-4 sm:px-10 pb-16">
      <p className="text-2xl font-bold text-gray-800 dark:text-[#1e1e1e]">
        Add Shipping <span className="text-primary-dark">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 max-w-xl w-full bg-white dark:bg-[#ecffd7] rounded-2xl shadow-xl border border-gray-200 dark:border-[#43c463]/30 p-6 md:p-8 backdrop-blur-md transform transition-transform hover:scale-[1.01]"
        >
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="mt-4 w-full py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Save Address
            </motion.button>
          </form>
        </motion.div>

        <motion.img
          src={assets.add_address_iamge}
          alt="Add Address Illustration"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm object-contain mx-auto md:mx-0 bg-white/50 p-8 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AddAddress;
