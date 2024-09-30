import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updatePastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");

  const [value, setValue] = useState("");

  // to get values from the query or path parameters
  const [searchParams, setSearchParams] = useSearchParams({});
  // get specific paste-id
  const pasteId = searchParams.get("pasteId");

  // fetch all pastes from store
  const allPastes = useSelector((state) => state.paste.pastes);

  // display the content present in the paste on change of pasteId
  useEffect(() => {
    if (pasteId) {
      const foundPaste = allPastes.find((p) => p._id === pasteId);
      // set values from the found state into current page component
      setTitle(foundPaste.title);
      setValue(foundPaste.content);
    }
  }, [pasteId]);

  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updatePastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }

    // after creation or updation, clean the state
    setTitle("");
    setValue("");
    setSearchParams({});
  };
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[65%] pl-4"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-2 rounded-2xl mt-2" onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div>
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
