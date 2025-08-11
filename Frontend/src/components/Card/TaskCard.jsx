import React, { useState } from 'react';

function TaskCard({ taskKey, setIsDelete, task, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    taskname: task?.taskname || '',
    desc: task?.desc || '',
    deadline: task?.deadline ? task.deadline.substring(0, 10) : '',
    status: task?.status || 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = () => {
    setDraft({
      taskname: task?.taskname || '',
      desc: task?.desc || '',
      deadline: task?.deadline ? task.deadline.substring(0, 10) : '',
      status: task?.status || 'pending',
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = () => {
    // Expect parent to handle update. Pass taskKey and updated fields.
    if (onSave) onSave(taskKey, draft);
    setIsEditing(false);
  };

  return (
    <div className="relative flex flex-col mx-3 my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      <div className="p-4">
        {!isEditing ? (
          <>
            <h4 className="mb-2 text-slate-800 text-xl font-semibold">
              {task?.taskname || 'Untitled Task'}
            </h4>
            {task?.desc ? (
              <h6 className="mb-2 text-slate-800">
                Description: {task.desc}
              </h6>
            ) : null}
            <p className="text-slate-600 leading-normal font-light">
              DeadLine: {task?.deadline ? task.deadline.substring(0, 10) : '—'}
            </p>
            <p className="text-slate-600 leading-normal font-light">
              Status: {task?.status || 'pending'}
            </p>

            <button
              className="rounded-md mx-2 bg-green-400 py-2 px-4 mt-6 text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700"
              type="button"
              onClick={startEdit}
            >
              Edit
            </button>

            <button
              onClick={() => setIsDelete(taskKey)}
              className="rounded-md mx-2 bg-red-500 py-2 px-4 mt-6 text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700"
              type="button"
            >
              Delete
            </button>

            <div className="pb-3 pt-2 px-1">
              <span className="text-sm text-slate-600 font-medium">
                created At: {task?.createdAt ? task.createdAt.substring(0, 10) : '—'}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Task Name</label>
                <input
                  type="text"
                  name="taskname"
                  value={draft.taskname}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter task name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="desc"
                  value={draft.desc}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={draft.deadline}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  name="status"
                  value={draft.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={saveEdit}
                className="rounded-md mx-2 bg-indigo-600 py-2 px-4 text-sm text-white shadow-md hover:bg-indigo-500"
                type="button"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="rounded-md mx-2 bg-gray-200 py-2 px-4 text-sm text-slate-700 shadow-sm hover:bg-gray-300"
                type="button"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
