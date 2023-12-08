import "../Forum.css";
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "./partial/Header";
import { useNavigate } from "react-router-dom";

const { REACT_APP_API_ENDPOINT } = process.env;

function Forum() {
  const navigate = useNavigate();

  const [chat, setChat] = useState([]);
  const [inputValue, setInputValue] = useState(""); // New state for handling input

  const handleChat = (e) => {
    setInputValue(e.target.value); // Update input value instead of chat
  };

  const submitChat = () => {
    axios
      .post(`${REACT_APP_API_ENDPOINT}/chat`, {
        id: localStorage.getItem("user"),
        email: localStorage.getItem("email"),
        chat: inputValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchChat = async () => {
      axios
        .get(`${REACT_APP_API_ENDPOINT}/api/chat`)
        .then((res) => {
          if (Array.isArray(res.data.chat)) {
            setChat(res.data.chat);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const intervalId = setInterval(() => {
      fetchChat();
    }, 100);

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div className="Forum">
      <Header />
      <br />
      <div className="forum-div">
        <h2>Forum</h2>

        <div className="mid col-md-12 ">
          <div className="chat-area">
            {chat.map((item) => {
              return (
                <div className="chat-div">
                  <div className="chat-user">
                    <p>{item.email}</p>
                    <p>{item.chat}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="input-area-div">
            <div className="d-flex">
              <input
                type="text"
                placeholder="Type here..."
                onChange={handleChat}
                value={inputValue}
              />
              <button
                style={{ margin: "0px", width: "100px" }}
                onClick={() => submitChat()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forum;
