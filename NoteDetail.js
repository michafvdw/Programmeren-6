import React from 'react';

function NoteDetail({ note, onClose }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
                <p className="text-lg mb-4">{note.body}</p>
                <p className="text-gray-600">Author: {note.author}</p>
                <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600">Close</button>
            </div>
        </div>
    );
}

export default NoteDetail;
