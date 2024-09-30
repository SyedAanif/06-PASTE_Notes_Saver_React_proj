import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// this will contain all the features and reducer functions for the PASTE app
// for now we can use local storage
// Inspect -> Application -> Local Storage(key-value)
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

// on the PASTE app, we will be adding, updating, deleting the notes/code
export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const { payload } = action;
      // push to the list of pastes from the initial-state to the centralised store
      state.pastes.push(payload);

      // add to local-storage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // show the toast on the UI
      toast.success("Paste Created Successfully!");
    },
    updatePastes: (state, action) => {
      const { payload } = action;
      // find index of the paste to be updated
      const index = state.pastes.findIndex((item) => item._id === payload._id);

      if (index >= 0) {
        // update the paste in the centralised redux store
        state.pastes[index] = payload;

        // update the paste in the local-storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated Successfully!");
      }
    },
    resetAllPastes: (state) => {
      // set to an empty list to clear redux store
      state.pastes = [];

      // local storage remove
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const { payload } = action;

      // find index of the paste to be removed
      const index = state.pastes.findIndex((item) => item._id === payload);

      if (index >= 0) {
        // remove the paste in the centralised redux store
        state.pastes.splice(index, 1);

        // update the paste in the local-storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Removed Successfully!");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updatePastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
