import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import Cookies from 'js-cookie';

const NotePage = () => {
  // useParams()はurlで指定した変数を取ってくるので、/note/:idとした場合、
  // const { id }にする必要がある。
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    if (id === "new") return;
    const response = await fetch(`/api/notes/${id}/`);
    const data = await response.json();
    setNote(data);
  };

  const updateNote = async () => {
    const csrftoken = Cookies.get('csrftoken');
    fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify(note),
    });
  };

  const createNote = async () => {
    const csrftoken = Cookies.get('csrftoken');
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify(note),
    });
  };
  
  const deleteNote = async () => {
    const csrftoken = Cookies.get('csrftoken');
    fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
    });
    navigate("/");
  };

  const handleSubmit = async () => {
    if (id !== "new" && note.body === '' ) {
      await deleteNote();
    } else if (id !== "new") {
      await updateNote();
    }else if(id ==='new' && note !== null){
      await createNote()
    }
    navigate("/");
  };

  return (
    <div className="note">
      {/* noteがnullまたundefinedの場合にエラーが発生しないようにnote?にする */}
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
