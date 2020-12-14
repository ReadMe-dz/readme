import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { setMsg as setMessage } from '../../redux-store/actions/msg.actions';
import ChatMessages from '../../containers/ChatMessages';
import ChatForm from '../../containers/ChatForm';
import ChatList from '../../containers/ChatList';
import Loader from '../../components/Loader';
import './style.scss';

const { REACT_APP_BASE_URL } = process.env;
const socket = io(REACT_APP_BASE_URL || '', {
  transports: ['websocket'],
  jsonp: false,
});

type message = {
  content: string;
  from: {
    id: string;
    name: string;
    username: string;
    picture: string;
    wilaya: string;
  };
  to: {
    id: string;
    name: string;
    username: string;
    picture: string;
    wilaya: string;
  };
  createdAt: string;
  id: string;
};

const Chat: React.FC = ({ user, setMsg }: any) => {
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [chatWith, setChatWith] = useState<string | null>(null);
  const [messages, setMessages] = useState<message[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on(user.id, (msg: any) => {
      if (msg.message) {
        setMsg(msg.message);
      } else {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get(`${REACT_APP_BASE_URL}/messages/chat-list`)
      .then((res) => {
        setChatList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (chatWith) {
      setLoading(true);
      Axios.get(`${REACT_APP_BASE_URL}/messages/${chatWith}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [chatWith]);

  const onSend = (content: string) => {
    const theMsg = {
      from: user.id,
      to: chatWith,
      content,
    };

    socket.emit('message', theMsg);
  };

  return (
    <div className="chat">
      <div className="aside aside-left">
        <ChatList setChatWith={setChatWith} list={chatList} />
      </div>

      <div className="aside aside-right">
        <div className="messages">
          {chatWith ? (
            <>
              {loading ? (
                <Loader dim={45} color="#ea4c89" />
              ) : (
                <ChatMessages messages={messages} myId={user.id} />
              )}
            </>
          ) : (
            <b className="no-one">
              You need to select a person to start chatting with.
            </b>
          )}
        </div>
        <ChatForm
          setMsg={setMsg}
          disabled={chatWith === null}
          onSend={onSend}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapActionsToProps = {
  setMsg: setMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(Chat);
