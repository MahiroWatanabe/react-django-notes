import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      {/* noteがnullまたundefinedの場合にエラーが発生しないようにnote?にする */}
      <h1>{note?.body}</h1>
    </div>
  );
};

export default NotePage;
