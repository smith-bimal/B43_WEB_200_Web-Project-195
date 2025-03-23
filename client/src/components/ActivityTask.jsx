import React, { useState } from 'react'

const ActivityTask = ({ task, isExpanded, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        ...task,
        descriptions: Array.isArray(task.descriptions) ? task.descriptions : [''], // Ensure descriptions is always an array
        date: task.date || new Date().toISOString().split('T')[0]
    });

    const handleSave = () => {
        // Filter out empty descriptions before saving
        const filteredDescriptions = editedTask.descriptions.filter(desc => desc.trim() !== '');
        const updatedTask = {
            ...editedTask,
            descriptions: filteredDescriptions.length > 0 ? filteredDescriptions : ['']
        };
        onEdit(updatedTask);
        setIsEditing(false);
    };

    return (
        <div className="mb-4 ml-4">
            {isEditing ? (
                <div className="bg-white/50 p-4 rounded-lg">
                    <input
                        type="date"
                        value={new Date(editedTask.date).toISOString().split('T')[0]}
                        onChange={(e) => setEditedTask(prev => ({ ...prev, date: e.target.value }))}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        value={editedTask.name}
                        onChange={(e) => setEditedTask(prev => ({ ...prev, name: e.target.value }))}
                        className="border p-2 rounded w-full mb-2"
                    />
                    {editedTask.descriptions.map((desc, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={desc}
                                onChange={(e) => {
                                    const newDesc = [...editedTask.descriptions];
                                    newDesc[idx] = e.target.value;
                                    setEditedTask(prev => ({ ...prev, descriptions: newDesc }));
                                }}
                                className="flex-1 border p-2 rounded"
                            />
                            <button
                                onClick={() => {
                                    const newDesc = [...editedTask.descriptions];
                                    if (idx === editedTask.descriptions.length - 1) {
                                        newDesc.push('');
                                    } else {
                                        newDesc.splice(idx, 1);
                                    }
                                    setEditedTask(prev => ({ ...prev, descriptions: newDesc }));
                                }}
                                className="bg-amber-500 rounded text-white px-3 py-1"
                            >
                                {idx === editedTask.descriptions.length - 1 ? '+' : '×'}
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-end gap-2 mt-2">
                        <button onClick={() => setIsEditing(false)} className="text-gray-600 px-4 py-2">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="bg-amber-500 rounded text-white px-4 py-2">
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between group items-start">
                    <div>
                        <h3 className="font-bold">{task.name}</h3>
                        <ul className="list-disc text-gray-500 text-sm ml-4 pl-4">
                            {(task.descriptions || []).map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                    {isExpanded && (
                        <div className="flex gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                            <i className="cursor-pointer fa-pen-to-square fa-solid hover:text-blue-600"
                                onClick={() => setIsEditing(true)}></i>
                            <i className="cursor-pointer fa-solid fa-trash hover:text-red-600"
                                onClick={() => onDelete(task._id)}></i>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ActivityTask