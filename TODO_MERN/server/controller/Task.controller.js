import TaskModel from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newTask = await TaskModel.create({ title, description });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
export const getAllTask = async (req, res) => {
  try {
    const taskData = await TaskModel.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return res.status(201).json({
      success: true,
      taskData,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
export const showTask = async (req, res) => {
  try {
    const { taskid } = req.params;

    const taskData = await TaskModel.findById(taskid).lean().exec();

    if (!taskData) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, taskData });
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { taskid } = req.params;
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const taskData = await TaskModel.findByIdAndUpdate(
      taskid,
      { title, description, status },
      { new: true }
    );

    if (!taskData) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: taskData,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskid } = req.params;

    const deletedTask = await TaskModel.findByIdAndDelete(taskid);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
