import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">epic</Link>
      <Routes>
        <Route path="kanban" element={<KanbanScreen />} />
        <Route path="epic" element={<EpicScreen />} />
        {/* 实现刚打开就显示看板 projects/id跟上面都不匹配 */}
        {/* <Navigate to={window.location.pathname + "/kanban"} /> */}
        <Navigate to={"kanban"} replace={true} />
      </Routes>
    </div>
  );
};
//['projects','projects/6','projects/6/kanban'] 往后退会去6,又变回6/kanban导致失效
//replace就会变成['projects','projects/6/kanban']
