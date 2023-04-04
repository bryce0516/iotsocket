import React from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { Mitt } from "mitt";
const socket = io("http://15.165.99.93:7712", {
  autoConnect: false,
  // auth: {
  //   offset: undefined,
  // },
});

// const emitter = new Mitt();

function App() {
  const formRef = React.useRef(null);
  const [isConnected, setIsConnected] = React.useState(socket.connected);
  const [fooEvents, setFooEvents] = React.useState([]);
  const [chatText, setChatText] = React.useState("");
  const [receivedMessage, setReceivedMessage] = React.useState("");
  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }
    socket.on("my-event", ({ id, data }) => {
      // do something with the data, and then update the offset
      socket.auth.offset = id;
    });
    socket.on("receive_message", (data) => {
      console.log("this is event", data);
      setReceivedMessage(data.send_message);
    });
    // socket.on("connect", onConnect);
    // socket.on("disconnect", onDisconnect);
    // socket.on("foo", onFooEvent);

    // return () => {
    //   socket.off("connect", onConnect);
    //   socket.off("disconnect", onDisconnect);
    //   socket.off("foo", onFooEvent);
    // };
    // socket.on(
    //   "new-operations",
    //   ({ editorId, ops }) => {
    //     if(id.current !== type) {
    //       remote.current = true
    //       JSON.parse(ops).forEach(op => {
    //         editor.current.applyOperation(op)

    //       }

    //     }
    //   }
    // );
    // socket.on("disconnect", () => {
    //   console.log("disconnected from server");
    // });
    // socket.on("message", (message) => {
    //   console.log("message from server", message);
    // });
    // socket.on("event", (event) => {
    //   console.log("event from server", event);
    // });
    // socket.on("reconnect_attempt", () => {
    //   console.log("reconnect_attempt");
    // });
    // socket.on("reconnecting", () => {
    //   console.log("reconnecting");
    // });
    // socket.on("reconnect", () => {
    //   console.log("reconnect");
    // });
    // socket.on("reconnect_error", () => {
    //   console.log("reconnect_error");
    // });
    // socket.on("reconnect_failed", () => {
    //   console.log("reconnect_failed");
    // });
    // socket.on("error", (error) => {
    //   console.log("error", error);
    // });
    // socket.on("connect_error", (error) => {
    //   console.log("connect_error", error);
    // });
    // socket.on("connect_timeout", (timeout) => {
    //   console.log("connect_timeout", timeout);
    // });
    // socket.on("ping", () => {
    //   console.log("ping");
    // });
    // socket.on("pong", (latency) => {
    //   console.log("pong", latency);
    // });
  }, []);
  function connect() {
    socket.connect();
    console.log("working");
  }

  function disconnect() {
    socket.emit("leave_room", "1");
    // socket.disconnect();
    console.log("dis working");
  }
  const joinRoom = () => {
    socket.emit("join_room", "1");
  };
  return (
    <div className="App">
      <div style={{ margin: 0, paddingBottom: "3rem" }}>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <ul id="messages">
          <p>{receivedMessage}</p>
        </ul>
        <button onClick={joinRoom}> Join Room</button>
        <form
          ref={formRef}
          id="form"
          action=""
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            padding: "0.25rem",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            height: "3rem",
            boxSizing: "border-box",
            backdropFilter: "blur(10px)",
          }}
        >
          <input
            onChange={(event) => {
              setChatText(event.target.value);
            }}
            id="input"
            autoComplete="off"
            style={{
              borderWidth: 1,
              padding: 0,
              // height: 100,
              // width: 100,
              flexGrow: 1,
              borderRadius: "2rem",
              margin: "0.25rem",
              outline: "none",
            }}
          />
          <button
            onClick={(event) => {
              event.preventDefault();
              console.log("this is caht", chatText);
              socket.emit("send_message", {
                send_message: chatText,
                room: "1",
              });
              // socket.timeout(1).emit("send_message", chatText);
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
