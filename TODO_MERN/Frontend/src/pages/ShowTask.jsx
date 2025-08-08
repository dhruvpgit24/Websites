import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ShowTask = () => {
  const { taskid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}show-task/${taskid}`
        );
        if (data.success) {
          setTitle(data.taskData.title);
          setDescription(data.taskData.description);
          setStatus(data.taskData.status || "pending");
        } else {
          toast.error(data.message || "Failed to load task");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching task");
      } finally {
        setFetching(false);
      }
    };
    fetchTask();
  }, [taskid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}update-task/${taskid}`,
        { title, description, status }
      );

      if (data.success) {
        toast.success("Task updated successfully!");
        navigate("/task-list");
      } else {
        toast.error(data.message || "Failed to update task");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Loading task...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] text-gray-100 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 p-8"
      >
        <h1 className="text-3xl font-semibold mb-8 text-center text-white">
          Edit Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-purple-300">
              Title
            </label>
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-purple-300">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Task description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-purple-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition"
            >
              <option value="pending" className="bg-[#1a1a2e]">
                Pending
              </option>
              <option value="Running" className="bg-[#1a1a2e]">
                Running
              </option>
              <option value="completed" className="bg-[#1a1a2e]">
                Completed
              </option>
              <option value="Failed" className="bg-[#1a1a2e]">
                Failed
              </option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:shadow-purple-700/40 transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Task"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ShowTask;
