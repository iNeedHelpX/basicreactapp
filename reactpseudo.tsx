import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const App = () => {
  const [posts, setPosts] = useState([]);
  // Use the useHistory hook from the react-router-dom library
  // to allow programmatic navigation to a different page in the application.
  const history = useHistory();

  // Fetch the list of recent public posts from the techcrunch  web API.
  // Use useEffect to execute this fetch only once, when the component mounts.
  useEffect(() => {
    fetch("https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  // Function to handle the click event on a post card.
  // It pushes a new entry onto the history stack, using the post's ID to specify the new URL.
  const handleClick = (post) => {
    history.push(`/post/${post.id}`, { post });
  };

  return (
    <div className="App">
      <h1>Recent Posts</h1>
      <div className="posts-container">
        {posts.map((post) => (
          // Use the motion.div component to add animations to the post card.
          <motion.div
            className="post-card"
            key={post.id}
            onClick={() => handleClick(post)}
            whileHover={{ scale: 1.1 }} // Scale up by 10% when hovered.
            whileTap={{ scale: 0.9 }} // Scale down by 10% when tapped.
            transition={{ duration: 0.2 }} // Control the duration of the animations.
          >
            <h2>{post.title.rendered}</h2>
            <p>{post.excerpt.rendered}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;
