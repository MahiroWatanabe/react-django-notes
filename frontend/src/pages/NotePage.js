import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  // useParams()はurlで指定した変数を取ってくるので、/note/:idとした場合、
  // const { id }にする必要がある。
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  const getNote = async () => {
    const response = await fetch(`/api/notes/${id}`);
    const data = await response.json();
    setNote(data);
  };

  return (
    <div className="note">
      {/* noteがnullまたundefinedの場合にエラーが発生しないようにnote?にする */}
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
