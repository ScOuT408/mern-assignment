import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const PostsContext = createContext();

// eslint-disable-next-line react/prop-types
const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/posts");
      setPosts(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getPost = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const createPost = async (content, image) => {
    try {
      await axios.post(
        "http://localhost:5000/api/posts/create",
        {
          content,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editPost = async (id, content, image) => {
    try {
      await axios.put(
        `http://localhost:5000/api/posts/update/${id}`,
        {
          content,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/delete/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const likePost = async (_id) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/posts/like/${_id}`,
        null,
        {
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addComment = async (postId, content) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/posts/comment`,
        { postId, content },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return result.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        createPost,
        getPosts,
        likePost,
        setPosts,
        getPost,
        editPost,
        deletePost,
        addComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
