import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import styles from "../styles/pages/Home.module.css";
import { Post, CommentDialog } from "../components";

const Home = () => {
  const { posts, getPosts } = useContext(PostsContext);

  const [isCommentPopupOn, setIsCommentPopupOn] = useState(false);
  const [activePostId, setActivePostId] = useState();

  const handleCommentBtnClick = async (postId) => {
    setActivePostId(postId);
    setIsCommentPopupOn(true);
  };

  const handleCloseComments = async () => {
    setActivePostId();
    setIsCommentPopupOn(false);

    await getPosts();
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.homepage}>
      <div className={styles.posts}>
        {posts?.posts?.length > 0 ? (
          <>
            {posts.posts.map((post) => (
              <Post
                post={post}
                name={post.userId.name}
                avatar={post.userId.avatar}
                key={post._id}
                onCommentBtnClick={handleCommentBtnClick}
              />
            ))}
          </>
        ) : (
          <h2> No posts yet </h2>
        )}
      </div>
      <CommentDialog
        id={activePostId}
        isOpen={isCommentPopupOn}
        onClose={handleCloseComments}
      />
    </div>
  );
};

export default Home;
