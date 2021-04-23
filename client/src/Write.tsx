import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { WRITE } from "./graphql/mutation/write";

function Write() {
  const [writer, setWriter] = useState("");
  const [description, setDescription] = useState("");

  const [addChat] = useMutation(WRITE);

  const sendChat = () => {
    addChat({
      variables: {
        writer,
        description,
      },
    });

    setWriter("");
    setDescription("");
  };

  return (
    <div>
      <input
        type="text"
        value={writer}
        placeholder="이름을 입력하세요"
        onChange={(e) => {
          setWriter(e.target.value);
        }}
      />
      <input
        type="text"
        value={description}
        placeholder="내용을 입력하세요"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendChat();
          }
        }}
      />
      <button
        onClick={() => {
          sendChat();
        }}
      >
        확인
      </button>
    </div>
  );
}

export default Write;
