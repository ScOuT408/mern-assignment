/* eslint-disable react/prop-types */
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { PostsContext } from "../context/PostsContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import TimeAgo from "react-timeago";
import styles from "../styles/components/post.module.css";
import { NavLink } from "react-router-dom";
import PostMenu from "./PostMenu";

const Post = ({
  post,
  name,
  avatar,
  onCommentBtnClick,
  isSelf,
  getPosts: getCustomPosts,
}) => {
  const { getPosts, likePost } = useContext(PostsContext);
  const { user } = useContext(AuthContext);

  const handleLikeBtnClick = async (postId) => {
    if (!user?._id) return;
    await likePost(postId);

    getCustomPosts ? getCustomPosts() : getPosts();
  };

  const renderAuthorDetails = () => {
    let url = `/user`;

    return (
      <NavLink to={url} className={styles.postAuthorDetails}>
        <img src={avatar} className={styles.postAuthorAvatar} />
        <span className={styles.postAuthor}>{name}</span>
      </NavLink>
    );
  };

  return (
    <div className={styles.post}>
      <div className={styles.postUpper}>
        {renderAuthorDetails()}
        <p className={styles.time}>
          <TimeAgo date={post.createdAt} />
        </p>
      </div>
      <div className={styles.postContent}>
        <p className={styles.postText}>{post.content}</p>
        {post.image && (
          <a href={post.image} target="_blank" rel="noreferrer">
            <img
              src={post.image}
              alt="Post image"
              className={styles.postImage}
              loading="lazy"
            />
          </a>
        )}
      </div>
      <div className={styles.postBottom}>
        <button onClick={() => handleLikeBtnClick(post._id)}>
          {post.likes.includes(user?._id) ? (
            <AiFillHeart className={styles.icons} size={21} color="#4385FF" />
          ) : (
            <AiOutlineHeart
              className={styles.icons}
              size={21}
              color="#4385FF"
            />
          )}
          {post.likes.length}
        </button>
        <button onClick={() => onCommentBtnClick(post._id)}>
          <GoCommentDiscussion
            className={styles.icons}
            size={21}
            color="#4385FF"
          />
          {post.comments.length}
        </button>

        {isSelf && <PostMenu id={post._id} />}
      </div>
    </div>
  );
};

export default Post;
