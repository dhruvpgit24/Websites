import React, { useEffect, useState } from "react";
import Badge from "../components/Badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}get-all-task`
        );

        if (data.success) {
          setTasks(data.taskData || []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    fetchTask();
  }, []);

  const handleDelete = async (taskid) => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}delete-task/${taskid}`
      );
      if (data.success) {
        toast.success("Task Deleted");
        setTasks((prev) => prev.filter((task) => task._id !== taskid));
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

const getBadgeProps = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return { color: "green", text: "Completed" };
    case "running":
      return { color: "purple", text: "Running" };
    case "in progress":
      return { color: "yellow", text: "In Progress" };
    case "pending":
    default:
      return { color: "blue", text: "Pending" };
  }
};


  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] text-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">My Tasks</h1>

        {tasks.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 backdrop-blur-md p-6 mb-6 rounded-2xl shadow-lg transition hover:shadow-purple-600/30"
          >
            <h3 className="text-lg font-semibold text-white mb-2 flex flex-wrap items-center gap-2">
              <span>{task.title}</span>
              <Badge props={getBadgeProps(task.status)} />
            </h3>

            <p className="text-sm text-gray-300 line-clamp-3 mb-4">
              {task.description}
            </p>

            <div className="flex gap-4 mt-4">
              <Link
                to={`/show-task/${task._id}`}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-purple-500/50 transition"
                title="View Task"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>

              <button
                onClick={() => handleDelete(task._id)}
                className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-red-500/50 transition"
                title="Delete Task"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;
