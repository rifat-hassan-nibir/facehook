import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
        dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
      } catch (err) {
        console.error(err);
        dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: err.message });
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) return <div>Loading...</div>;

  return (
    <div className="text-white">
      {state?.user?.firstName}
      <p>Posts: {state?.posts?.length}</p>
    </div>
  );
};

export default ProfilePage;
