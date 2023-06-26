import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/pages/UserProfile.module.css";
import { CommentDialog, Post } from "../components";

const UserProfile = () => {
  const { getUserProfile, user } = useContext(AuthContext);

  // get single user id from posts array
  const userId = user?.posts?.map((post) => post.userId);
  let singleId = [...new Set(userId)];
  const finalId = singleId[0];

  const [isCommentPopupOn, setIsCommentPopupOn] = useState(false);
  const [activePostId, setActivePostId] = useState();

  const handleCommentBtnClick = async (postId) => {
    setActivePostId(postId);
    setIsCommentPopupOn(true);
  };

  const handleCloseComments = () => {
    setActivePostId();
    setIsCommentPopupOn(false);
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.userProfile}>
      <div className={styles.userDetails}>
        <img src={user?.avatar} className={styles.userAvatar} />
        <div>
          <div className={styles.nameAndScore}>
            <p className={styles.name}>{user?.name}</p>
            <p className={styles.name}>{user?.email}</p>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        {user?.posts?.length > 0 ? (
          <>
            {user.posts.map((post) => (
              <Post
                key={post._id}
                avatar={user.avatar}
                name={user.name}
                post={post}
                isSelf={user._id === finalId}
                getPosts={getUserProfile}
                onCommentBtnClick={handleCommentBtnClick}
              />
            ))}
          </>
        ) : (
          <>
            <h3> no post </h3>
          </>
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

export default UserProfile;
