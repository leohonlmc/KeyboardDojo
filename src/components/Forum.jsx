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
  const [inputValue, setInputValue] = useState("");

  const handleChat = (e) => {
    setInputValue(e.target.value);
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

  const deleteChat = (id) => {
    axios
      .delete(`${REACT_APP_API_ENDPOINT}/api/chat/${id}`)
      .then((res) => {
        alert("Chat deleted");
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

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="Forum">
      <Header />
      <br />
      <div className="forum-div">
        <h2>Forum</h2>

        <div className="mid col-md-12 ">
          <div className="chat-area">
            {chat.map((item, index) => {
              return (
                <div className="chat-div" key={item._id}>
                  <div className="chat-user">
                    <p>{item.email}</p>
                    <p>{item.chat}</p>
                    <div className="delete-btn">
                      {localStorage.getItem("user") ===
                      "657145aa721b4e6732c535c6" ? (
                        <button
                          className="btn btn-danger"
                          style={{ margin: "0px" }}
                          onClick={() => deleteChat(item._id)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
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
