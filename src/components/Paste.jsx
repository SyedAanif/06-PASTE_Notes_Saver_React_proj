import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  // fetch states from the redux store
  const pastes = useSelector((state) => state.paste.pastes);

  // build search filter
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // dispatch actions to the redux-store
  const dispatch = useDispatch();
  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success("Content Copied to Clipboard!");
  };

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="Search title here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display filtered data */}
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button><Link to={`/?pasteId=${paste?._id}`}>Edit</Link></button>
                  <button>
                    <Link to={`/pastes/${paste?._id}`}>View</Link>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleCopy(paste?.content)}>
                    Copy
                  </button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
