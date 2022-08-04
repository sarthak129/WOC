import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Play from "./pages/play";
import Create from "./pages/create";
import Custom from "./pages/custom";
import NotFound from "./pages/404";
import Leader from "./pages/leader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth } from "aws-amplify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const StateParamWrapper = () => {
    const [search] = useSearchParams();
    const stateParam = search.get("token");
    return stateParam ? (
      <Custom token={stateParam} />
    ) : (
      <Play auth={authProps} />
    );
  };

  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const setAuthStatus = (authenticated) => {
    setState({ ...state, isAuthenticated: authenticated });
  };

  const setUser = (user) => {
    setState({ ...state, user: user });
  };

  useEffect(() => {
    async function fetchSession() {
      try {
        const session = await Auth.currentSession();
        setAuthStatus(true);
        console.log(session);
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (error) {
        if (error !== "No current user") {
          console.log(error);
        }
      }
    }
    fetchSession();
  },[]);

  const authProps = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    setAuthStatus: setAuthStatus,
    setUser: setUser,
  };
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar auth={authProps} />
        <div className="flex-1 sm:px-32 px-12 py-12 bg-cyan-50">
          <Routes>
            <Route exact path="/" element={<Login auth={authProps} />} />
            <Route path="/login" element={<Login auth={authProps} />} />
            <Route path="/home" element={<Homepage auth={authProps} />} />
            <Route path="/signup" element={<Signup auth={authProps} />} />
            <Route path="/forgot" element={<Forgot auth={authProps} />} />
            <Route path="/reset" element={<Reset auth={authProps} />} />
            <Route path="/play" element={<Play auth={authProps} />} />
            <Route element={<StateParamWrapper />}>
              <Route path="/custom" element={<Custom />} />
            </Route>
            <Route path="/create" element={<Create auth={authProps} />} />
            <Route path="/leaderboard" element={<Leader auth={authProps} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
