
import { Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

function App() {

  return (
    <>
      <GlobalStyles />
      <Route path="/" component={PostList} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/detail/:post_id" component={PostDetail} exact/>
      <Route path="/write" component={PostWrite} exact />
      <Route path="/write/:post_id" component={PostWrite} exact />
      <Route path="/likelist" component={LikeList} exact/>
        
    </>
  );
}

export default App;
