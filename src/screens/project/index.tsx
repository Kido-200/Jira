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
  /* 让儿子的辅轴也就是高度等于这个父亲Aside的高度,也就是让下面的Menu能高度占满了 */
  /* 这个Aside是grid设置的,所以他是占满高度的 */
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
  width: 100%;
`;
