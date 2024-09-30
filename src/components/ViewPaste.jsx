import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  // extract id from the path
  const { id } = useParams();

  // fetch all states from the redux store
  const allPastes = useSelector((state) => state.paste.pastes);

  const [paste] = allPastes.filter((p) => p._id === id);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[100%] pl-4"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
      </div>

      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          placeholder="Enter Content Here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
