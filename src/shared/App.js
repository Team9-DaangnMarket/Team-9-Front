import { Route, Switch } from 'react-router-dom'
import GlobalStyles from "./GlobalStyles";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import LikeList from "../pages/LikeList";
import SearchList from "../pages/SearchList";
import NotFound from "../pages/NotFound";
import Permit from '../shared/Permit'

function App() {
  return (
      <>
        <GlobalStyles/>
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <Permit>
            <Route path="/" component={PostList} exact/>
            <Route path="/detail/:post_id" component={PostDetail} exact/>
            <Route path="/write" component={PostWrite} exact/>
            <Route path="/write/:post_id" component={PostWrite} exact/>
            <Route path="/likelist" component={LikeList} exact/>
            <Route path="/search" component={SearchList} exact/>
          </Permit>
          <Route component={NotFound} />
        </Switch>
      </>
  )
}

export default App
