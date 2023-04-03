/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState, useRef } from 'react';
import P from 'prop-types';
import './App.css';

// New Component
const Post = ({ post, handleClick }) => {
   console.log('filho');
   return (
      <div key={post.id} className="post">
         <h1
            onClick={() => handleClick(post.title)}
            style={{ fontSize: '28px' }}
         >
            {post.title}
         </h1>
         <p>{post.body}</p>
      </div>
   );
};

//Tipagem
Post.prototype = {
   post: P.shape({
      id: P.number,
      title: P.string,
      body: P.string,
   }),
   onClick: P.func,
};

function App() {
   const [posts, setPosts] = useState([]);
   const [value, setValue] = useState('');
   const input = useRef(null);
   const counter = useRef(0);

   console.log('pai');

   //component did mount
   useEffect(() => {
      setTimeout(() => {
         fetch('https://jsonplaceholder.typicode.com/posts')
            .then((r) => r.json())
            .then((r) => setPosts(r));
      }, []);
   }, []);

   useEffect(() => {
      input.current.focus();
      console.log(input.current);
   }, [value]);

   useEffect(() => {
      counter.current++;
   });

   const handlerClick = (value) => {
      setValue(value);
   };

   return (
      <div className="App">
         <h1>renderizo: {counter.current} x</h1>
         <p>
            <input
               ref={input}
               type="search"
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
         </p>
         {useMemo(() => {
            return (
               posts.length > 0 &&
               posts.map((post) => {
                  return (
                     <Post
                        key={post.id}
                        post={post}
                        handleClick={handlerClick}
                     />
                  );
               })
            );
         }, [posts])}
         {posts.length <= 0 && <p>Ainda nao tem post</p>}
      </div>
   );
}
export default App;
