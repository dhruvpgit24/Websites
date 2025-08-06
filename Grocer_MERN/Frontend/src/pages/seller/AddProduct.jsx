import React, { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";
import { toast } from "sonner";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios } = useAppContext();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };
      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      className="no-scrollbar flex justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-6 w-full max-w-lg bg-white/80 backdrop-blur-sm shadow-xl rounded-xl border border-gray-200"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div>
          <p className="text-lg font-semibold text-gray-800">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="cursor-pointer transition hover:scale-105"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <motion.img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt=""
                    className="w-24 h-24 object-cover rounded-md border border-gray-300 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300 transition"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            placeholder="Type here"
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm resize-none focus:ring-2 focus:ring-green-300 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="category"
          >
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300 transition"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="product-price"
            >
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300 transition"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300 transition"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-md shadow-md transition"
        >
          ADD
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddProduct;
