import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import './App.scss';
import Feed from './Feed/Feed';
import Header from './Header/Header';
import Login from './Login/Login';
import PostCreate from './PostCreate/PostCreate';
import PostPage from "./PostPage/PostPage";
import EditProfile from './EditProfile/EditProfile';
import ProfileContent from './ProfileContent/ProfileContent';
import Register from './Register/Register';
import { UserService } from './services/user.service';
import { UserContext } from "./user-context";
import Search from './Search/Search';


function App() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [txt, setTxt] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const user = await UserService.me();
        if (!user) {
          history.push("/login");
          return;
        }
        setUser(user);
        // history.push("/");
      }
      catch (e) {
        console.log(e);
      }
    }
    getMe();
  }, [history]);

  function isLogged() {
    return Boolean(Object.keys(user).length);
  }
  return (
    <UserContext.Provider value={{ user, setUser, txt, setTxt }}>
      <div className="App">
        {isLogged() && <Header />}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile/:username">
            <ProfileContent />
          </Route>
          <Route path="/profile">
            <EditProfile />
          </Route>
          <Route path="/post/create">
            <PostCreate />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/" exact>
            <Feed />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;

