import { Route } from "react-router-dom";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostWrite from "../pages/PostWrite";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/" component={PostList} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/detail" component={PostDetail} exact />
      <Route path="/write" component={PostWrite} exact />
    </>
  );
}

export default App;
