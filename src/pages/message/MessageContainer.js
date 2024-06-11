import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageContainer.module.css';

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [showTotalContainer, setShowTotalContainer] = useState(true); // State to toggle total container
  const isLoggedIn = sessionStorage.getItem('user_id');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/messages', {
      params: {
        user_id: isLoggedIn
      },
      withCredentials: true
    })
    .then(response => {
      setMessages(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedConversation) {
      axios.get('http://127.0.0.1:5000/api/messages/conversation', {
        params: {
          other_user_id: selectedConversation,
          user_id: isLoggedIn
        },
        withCredentials: true
      })
      .then(response => {
        setConversationMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching conversation data:', error);
      });
    }
  }, [selectedConversation]);


  const handleMessageClick = (toUserId) => {
    setSelectedConversation(toUserId);
    setShowTotalContainer(false); // Hide total container when a message is clicked
  };

  const handleBackClick = () => {
    setSelectedConversation(null);
    setShowTotalContainer(true); // Show total container when going back
  };

  return (
    <div>
      {showTotalContainer ? ( // Render total container only if showTotalContainer is true
        <div className='total-container' style={{ border: '1px solid black', padding: '20px', paddingRight: '25px', maxHeight: '400px', overflowY: 'scroll' }}>
          <h4 style={{ marginLeft: '30px' , fontWeight: 'bold'}}>채팅</h4>
          <ul className="message-container" style={{ listStyleType: 'none', overflowY: 'auto' }}>
            {messages.map(message => (
              <li key={message._id} style={{ border: '2px solid lightgray', borderRadius: '5px', padding: '10px', marginBottom: '5px'}}>
                <p className="user-id" style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px' }}>{message.to_user_id}</p>
                <p className="message-content" style={{marginBottom: '-3px'}} onClick={() => handleMessageClick(message.to_user_id)}>{message.message}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="individual-message" style={{ border: '1px solid black', padding: '20px', paddingRight: '25px', height: '800px', width: '400px', overflowY: 'scroll', position: 'relative' }}>
            <ul style={{ listStyleType: 'none', overflowY: 'auto', maxHeight: '100%' }}>
                {conversationMessages.map((conversationMessage, index) => (
                    <div key={conversationMessage._id} style={{ marginBottom: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: conversationMessage.from_user_id === isLoggedIn ? 'flex-start' : 'flex-end' }}>
                            <div style={{ backgroundColor: conversationMessage.from_user_id === isLoggedIn ? 'white' : 'yellow', borderRadius: '10px', padding: '5px', marginRight: conversationMessage.from_user_id === isLoggedIn ? '10px' : '0', marginLeft: conversationMessage.from_user_id === isLoggedIn ? '0' : '10px', border: `2px solid ${conversationMessage.from_user_id === isLoggedIn ? 'lightgray' : 'yellow'}`, boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                                <p style={{ marginBottom: '-3px', fontSize: '0.8rem', color: 'gray' }}>
                                    {conversationMessage.created_at}
                                </p>
                                <p style={{ marginBottom: '-3px' }}>{conversationMessage.message}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
            <button onClick={handleBackClick} style={{ position: 'absolute', bottom: '10px', left: '10px', overflowY: 'visible' }}>뒤로</button> {/* Add a button to go back */}
        </div>
      )}
    </div>
  );  
}

export default ChatMessages;
