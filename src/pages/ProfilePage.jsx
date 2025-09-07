import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`);
        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div className="text-white">{user?.firstName}</div>;
};

export default ProfilePage;
