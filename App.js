// App.js

import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Importeer de Tailwind CSS-stijlen
import NoteDetail from './NoteDetail.js'; // Importeer de NoteDetail-component
import styles from './styles.css'

const apiUrl = 'https://docent.cmi.hro.nl/bootb/demo/notes/';

function NotesApp() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setNotes(data.items);
        } catch (error) {
            console.error('Error fetching notes:', error.message);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await fetch(apiUrl + noteId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error.message);
        }
    };

    const editNote = async (noteId, newTitle, newBody, newAuthor) => {
        try {
            const response = await fetch(apiUrl + noteId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ title: newTitle, body: newBody, author: newAuthor })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            fetchNotes();
        } catch (error) {
            console.error('Error updating note:', error.message);
        }
    };

    const addNote = async (title, body, author) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ title, body, author })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            fetchNotes();
        } catch (error) {
            console.error('Error adding note:', error.message);
        }
    };

    const handleAddNote = (event) => {
        event.preventDefault();
        const title = event.target.elements.noteTitle.value;
        const body = event.target.elements.noteBody.value;
        const author = event.target.elements.noteAuthor.value;

        if (title.trim() !== '' && body.trim() !== '' && author.trim() !== '') {
            addNote(title, body, author);
        }

        event.target.reset();
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleCloseNoteDetail = () => {
        setSelectedNote(null);
    };

    return (
        <div className="bg-blue-500 text-white p-5">
            <h1 className="text-3xl mb-5">Notes</h1>
            <div>
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <p>Title: {note.title}</p>
                            <p>Body: {note.body}</p>
                            <p>Author: {note.author}</p>
                            <button className="bg-blue-700 text-white px-3 py-1 rounded mr-2" onClick={() => deleteNote(note.id)}>Delete</button>
                            <button onClick={() => editNote(note.id, prompt('Enter the new title:'), prompt('Enter the new body:'), prompt('Enter the new author:'))}>Edit</button>
                            <button onClick={() => handleNoteClick(note)}>Details</button>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleAddNote}>
                <label htmlFor="noteTitle">Nieuwe notitie:</label>
                <input type="text" id="noteTitle" name="noteTitle" required />
                <label htmlFor="noteBody">Notitie inhoud:</label>
                <input type="text" id="noteBody" name="noteBody" required />
                <label htmlFor="noteAuthor">Auteur:</label>
                <input type="text" id="noteAuthor" name="noteAuthor" required />
                <button type="submit">Toevoegen</button>
            </form>
            {selectedNote && <NoteDetail note={selectedNote} onClose={handleCloseNoteDetail} />}
        </div>
    );
}

export default NotesApp;
