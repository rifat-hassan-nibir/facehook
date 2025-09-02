import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";

function Logout() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <button className="icon-btn" onClick={handleNavigate}>
      <img src={LogoutIcon} alt="Logout" />
    </button>
  );
}

export default Logout;
