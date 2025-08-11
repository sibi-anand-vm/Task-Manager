import React, { useState } from "react";

function AddTaskForm({ onSubmitAddTask }) {
  const [taskForm, setTaskForm] = useState({
    taskname: "",
    deadline: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-xl p-4 max-w-4xl mx-auto mt-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Task Name */}
        <input
          name="taskname"
          onChange={handleChange}
          value={taskForm.taskname}
          type="text"
          placeholder="Task Name"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Description */}
        <input
          name="desc"
          onChange={handleChange}
          value={taskForm.desc}
          type="text"
          placeholder="Description"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Deadline */}
        <input
          name="deadline"
          onChange={handleChange}
          value={taskForm.deadline}
          type="date"
          required
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Add Button */}
        <button
          onClick={() => onSubmitAddTask(taskForm)}
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTaskForm;
