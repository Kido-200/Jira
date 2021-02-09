import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";

loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      {/* 注意了AppProviders是我们自己写的函数组件,App作为他的children必须要在他里面手动渲染children */}
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);
