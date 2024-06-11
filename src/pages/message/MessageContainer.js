import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageContainer.module.css';

function ChatMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [showTotalContainer, setShowTotalContainer] = useState(true); // State to toggle total container
  const [isReplying, setIsReplying] = useState(false); // State to toggle reply input
  const [messageText, setMessageText] = useState(''); // State for message text
  const isLoggedIn = sessionStorage.getItem('user_id');
  

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/messages', {
      params: {
        user_id: isLoggedIn
      },
      withCredentials: true
    })
    .then(response => {
        const sortedMessages = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setMessages(sortedMessages);
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

  const handleReplyClick = () => {
    setIsReplying(!isReplying); // Toggle the reply input state
  };

  const handleSendClick = () => {
    axios.post('http://127.0.0.1:5000/api/messages', {
      user_id: isLoggedIn,
      to_user_id: selectedConversation,
      message: messageText
    }, { withCredentials: true })
    .then(response => {
      setConversationMessages(prevMessages => [...prevMessages, response.data]);
      setMessageText('');
      setIsReplying(false);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  };

  const handleDeleteMessage = (messageId, isLoggedIn) => {
    axios.delete(`http://127.0.0.1:5000/api/messages/${messageId}`, { 
        params: {
            user_id: isLoggedIn
        },
        withCredentials: true 
    })
        .then(response => {
            // 삭제에 성공했을 때, 화면에서 해당 메시지를 제거합니다.
            setConversationMessages(prevMessages => prevMessages.filter(message => message._id !== messageId));
        })
        .catch(error => {
            console.error('Error deleting message:', error);
        });
  };

  return (
    <div style={{ position: 'relative' }}>
        {showTotalContainer ? ( // Render total container only if showTotalContainer is true
        <div className='total-container' style={{ border: '1px solid black', padding: '20px', paddingRight: '25px', maxHeight: '400px', overflowY: 'scroll', width: '400px' }}>
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
        <div className="individual-message" style={{ border: '1px solid black', padding: '20px', paddingRight: '25px', height: '600px', width: '400px', overflowY: 'scroll', position: 'relative' }}>
            <ul style={{ listStyleType: 'none', maxHeight: '100%' }}>
                {conversationMessages.map((conversationMessage, index) => (
                    <div key={conversationMessage._id} style={{ marginBottom: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: conversationMessage.to_user_id === isLoggedIn ? 'flex-start' : 'flex-end', position: 'relative' }}>
                            <div style={{
                                backgroundColor: conversationMessage.to_user_id === isLoggedIn ? 'white' : 'yellow',
                                borderRadius: '10px',
                                padding: '3px',
                                marginRight: conversationMessage.to_user_id === isLoggedIn ? '30px' : '-20px',
                                marginLeft: conversationMessage.to_user_id === isLoggedIn ? '-40px' : '30px',
                                border: `2px solid ${conversationMessage.to_user_id === isLoggedIn ? 'lightgray' : 'lightgray'}`, // Adjusted the border color for yellow boxes
                                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
                                borderColor: conversationMessage.to_user_id === isLoggedIn ? 'lightgray' : 'lightgray', // Ensure yellow boxes have a gray border
                                marginTop: '5px', // Added margin between rectangles
                                marginBottom: '5px', // Added margin between rectangle
                                position: 'relative', // Added position relative for proper positioning of delete button
                            }}>
                                <p style={{ marginBottom: '-3px', fontSize: '0.8rem', color: 'gray' }}>
                                    {conversationMessage.created_at}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}> {/* Container for message and delete button */}
                                    <p style={{ marginBottom: '-3px' }}>{conversationMessage.message}</p>
                                    {isLoggedIn && ( // Only show delete button if the user is logged in
                                        <button
                                            style={{
                                                marginLeft: '20px', // Add some space between message and delete button
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: 'red',
                                                fontSize: '0.8rem',
                                                fontWeight: 'normal', // 폰트 굵기 설정
                                                transition: 'font-weight 0.2s ease', // 애니메이션 효과 추가
                                            }}
                                            onClick={() => handleDeleteMessage(conversationMessage._id, isLoggedIn)}
                                            // 마우스를 올렸을 때의 스타일
                                            onMouseEnter={(e) => { e.target.style.fontWeight = 'bold'; }}
                                            // 마우스를 내렸을 때의 스타일
                                            onMouseLeave={(e) => { e.target.style.fontWeight = 'normal'; }}
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
            <button onClick={handleBackClick} style={{ position: 'absolute', bottom: '10px', left: '10px' }}>뒤로</button>
            <button onClick={handleReplyClick} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>답장</button>
            {isReplying && (
              <div style={{ position: 'absolute', bottom: '50px', left: '10px', right: '10px', backgroundColor: 'white', padding: '10px', border: '1px solid lightgray', borderRadius: '5px' }}>
                <textarea 
                  value={messageText} 
                  onChange={(e) => setMessageText(e.target.value)} 
                  rows="3" 
                  style={{ width: '100%' }} 
                />
                <button onClick={handleSendClick} style={{ marginTop: '10px', width: '100%' }}>전송</button>
              </div>
            )}
        </div>
      )}
    </div>
  );  
}

export default ChatMessages;
