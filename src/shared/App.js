import { Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostDetail from '../pages/PostDetail';

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/" component={PostList} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/signup" component={Signup} exact />
      <Route path="/detail" component={PostDetail} exact />
    </>
  );
}

export default App;
