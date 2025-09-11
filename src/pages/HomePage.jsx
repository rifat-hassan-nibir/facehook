import { useEffect, useReducer } from "react";
import { initialState, postReducer } from "../reducers/PostsReducer";
import useAxios from "../hooks/useAxios";
import PostsList from "../components/posts/PostsList";
import { actions } from "../actions";

const HomePage = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHED });
    const fetchPosts = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`);
        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };

    fetchPosts();
  }, []);

  if (state?.loading) {
    return <div>We are working</div>;
  }

  if (state?.error) {
    return <div>Error in fetching posts {state?.error?.message}</div>;
  }

  return (
    <>
      <PostsList posts={state?.posts} />
    </>
  );
};

export default HomePage;
