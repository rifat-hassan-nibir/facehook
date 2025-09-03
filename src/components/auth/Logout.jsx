import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

function Logout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <button className="icon-btn" onClick={handleNavigate}>
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
}

export default Logout;
