import styled from "@emotion/styled";
import { Menu } from "antd";
import React from "react";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="kanban" element={<KanbanScreen />} />
          <Route path="epic" element={<EpicScreen />} />
          {/* 实现刚打开就显示看板 projects/id跟上面都不匹配 */}
          {/* <Navigate to={window.location.pathname + "/kanban"} /> */}
          <Navigate to={"kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};
//['projects','projects/6','projects/6/kanban'] 往后退会去6,又变回6/kanban导致失效
//replace就会变成['projects','projects/6/kanban']
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  //左边16rem 右边看着办
  grid-template-columns: 16rem 1fr;
`;
