import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

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
  }, [api, auth?.user?.id, dispatch]);

  if (state?.loading) return <div>Loading...</div>;

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* profile info */}
        <ProfileInfo />
        {/* end profile info */}

        {/* post  */}
        <MyPosts />
        {/* post ends */}
      </div>
    </main>
  );
};

export default ProfilePage;
