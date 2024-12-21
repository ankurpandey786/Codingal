import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [isModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleEndClass = () => {
    setModalOpen(false);
    setTimeLeft(0);
  };

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`);
      const data = await response.json();
      setPosts((prev) => [...prev, ...data.data]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMorePosts();
  }, []); 

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <img src="https://is5-ssl.mzstatic.com/image/thumb/Purple122/v4/31/ab/3c/31ab3c6d-aeae-ebeb-2e80-714f8163062a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png" alt="logo" className="navbar-logo" />
          <div className="lesson-title">Trial Lesson [Grade 1-3]</div>
        </div>
        <div className="navbar-right">
          <div className="timer">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
          <button className="end-class-btn" onClick={() => setModalOpen(true)}>End Class</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to end the class?</p>
            <button onClick={handleEndClass}>End Class</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <h1>Posts</h1>
      <div>
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            {post.name}
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <button onClick={loadMorePosts}>Load More</button>
    </div>
  );
};

export default App;