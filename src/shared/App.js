import {Route} from "react-router-dom";
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import GlobalStyles from "./GlobalStyles";

function App() {
  return (
      <>
        <GlobalStyles/>
        <Route path="/" component={PostList} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/signup" component={Signup} exact/>
      </>
  );
}

export default App;
