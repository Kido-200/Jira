import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  projectModalOpen: boolean;
}

//这个slice维护的状态
const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projctListSlice",
  initialState,
  reducers: {
    //内置了immer 看着像直接修改了state,其实不是
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

//actions就是这reducers里面的方法
export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
