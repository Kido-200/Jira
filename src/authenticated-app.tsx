import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import ProjectListScreen from "./screens/project-list";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown } from "antd";
import Menu from "antd/lib/menu";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";
// import softwareLogo from 'assets/software-logo.svg'

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path="/projects"
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            ></Route>
            <Route
              path="/projects/:projectId/*"
              element={<ProjectScreen />}
            ></Route>
            <Navigate to="/projects" />
          </Routes>
        </BrowserRouter>
      </main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type="link" onClick={resetRoute}>
          {/* <img src={softwareLogo} /> 这样是img的形式我们希望svg形式渲染,就可以自定义样式 */}
          <SoftwareLogo width={"18rem"} color={"rgb(38,132,255"} />
        </Button>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout">
            <ButtonNoPadding type="link" onClick={logout}>
              登出
            </ButtonNoPadding>
            {/* <a onClick={logout}>登出</a> */}
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem calc(100vh - 6rem);
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;
