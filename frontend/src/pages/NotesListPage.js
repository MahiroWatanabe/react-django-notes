import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const response = await fetch("/api/notes/");
    let data = await response.json();
    setNotes(data);
  };

  return (
    <div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesListPage;