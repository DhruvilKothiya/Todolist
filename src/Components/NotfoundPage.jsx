import React from "react";
import { useNavigate} from "react-router-dom";
import "./NotFound.css";

const NotfoundPage = () => {
    const navigate=useNavigate()
//   const history = useHistory();
  const handleGoHome = () => {
    navigate("/"); // Redirects to the homepage
  };
  return (
    <div className="not-found-container">
      <div className="text-container">
        <h1>404</h1>
        {/* <img
          src="/images/Group.webp"
          alt="404 Robot"
          className="overlay-image"
        /> */}
        <p>OOPS! PAGE NOT FOUND</p>
        <button onClick={handleGoHome}>GO TO HOMEPAGE</button>
      </div>
    </div>
  );
};
export default NotfoundPage;
