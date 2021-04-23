import React from "react";
import Home from "./Home";
import UseNotificationComponent from "./UseNotification";
import Write from "./Write";

function App() {
  return (
    <div className="App">
      <div>댓글 알림</div>
      <Home />
      <Write />
      <UseNotificationComponent />
    </div>
  );
}

export default App;
