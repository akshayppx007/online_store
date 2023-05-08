import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layouts/loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../actions/userActions";
import { toast } from "react-toastify";

const ProtectedRoutes = ({admin}) => {
	const dispatch = useDispatch();
    const { loading, error, user, isAuthenticated } = useSelector(
		(state) => state.persistReducer.loginUser
	);

    useEffect(() => {
        if(!user) {
            dispatch(getUserProfile());
        }
    }, [isAuthenticated, user, loading, dispatch]);

    if (loading) {
        return <Loader />;
      } else if (
        isAuthenticated === true &&
        user &&
        user.isAdmin === true &&
        admin === true
      ) {
        return <Outlet />;
      } else if (
        isAuthenticated === true &&
        user &&
        user.isAdmin === false &&
        admin === false
      ) {
        return <Outlet />;
      } else if (isAuthenticated === true && user && user.isAdmin === false) {
        return (
            <Navigate to="/" />
        );
      } else {
        toast.error("authorization required to access protected routes");
        return <Navigate to="/login" />;
      }
    
};

export default ProtectedRoutes;
