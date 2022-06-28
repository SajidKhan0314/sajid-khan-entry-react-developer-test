import { useNavigate, useParams, useLocation } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    let params = useParams();
    let location = useLocation();

    return (
      <Component
        params={params}
        navigate={navigate}
        location={location}
        {...props}
      />
    );
  };

  return Wrapper;
};
