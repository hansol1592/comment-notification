import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CHATTING } from "./graphql/query/chatting";
import { NEW_CHAT } from "./graphql/subscription/new-chat";
import { useNotification } from "./UseNotification";

interface Chat {
  id: string;
  writer: string;
  description: string;
}

let unsubscribe: (() => void) | null = null;

function Home() {
  const { subscribeToMore, loading, data } = useQuery(CHATTING);
  const [body, setBody] = useState("");

  const triggerNotification = useNotification("고위드", {
    body,
  });

  useEffect(() => {
    if (body) {
      triggerNotification && triggerNotification();
    }
  }, [data]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!unsubscribe) {
    unsubscribe = subscribeToMore({
      document: NEW_CHAT,
      // TODO: 추후 variables: {corpId: *, loginUserId: *} 형태가 될 듯.
      variables: { writer: "test" },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;

        const newChatItem = subscriptionData.data.newChat;

        // body for notification
        if (newChatItem) {
          setBody(
            `${newChatItem.writer} 가 ${newChatItem.description} 라고 함.`
          );
        }

        return {
          ...prev,
          chatting: [...prev.chatting, newChatItem],
        };
      },
    });
  }

  return (
    <div>
      {data.chatting.map((chat: Chat, index: number) => (
        <div key={index}>
          {chat.writer}: {chat.description}
        </div>
      ))}
    </div>
  );
}

export default Home;
