import React from "react";

export const useNotification = (
  title: string,
  options?: NotificationOptions | undefined
) => {
  if (!("Notification" in window)) {
    return;
  }

  const handleClick = function (event: Event) {
    event.preventDefault();
    window.open("https://www.gowid.com/", "_blank");
  };

  const triggerNotification = () => {
    if (Notification.permission !== "granted") {
      // denied
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, options);
          notification.onclick = handleClick;
        } else {
          return;
        }
      });
    } else {
      // permisstion === "granted"
      const notification = new Notification(title, options);
      notification.onclick = handleClick;
    }
  };

  return triggerNotification;
};

export default function UseNotificationComponent() {
  const triggerNotification = useNotification("고위드", {
    body: "얄림 내용",
  });

  return (
    <div className="App">
      <button onClick={triggerNotification}>알림</button>
    </div>
  );
}
