import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add.svg";
const AddButton = () => {
  return (
    // /note/: idこの: idの部分は数値でも文字でも良いから、
    // /noteを指定した時点でNotePage.jsに遷移する
    <Link to="/note/new" className="floating-button">
      <AddIcon />
    </Link>
  );
};

export default AddButton;
