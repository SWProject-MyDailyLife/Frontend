import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import UserContainer from "./pages/user/UserContainer";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import MainContainer from "./pages/MainContainer";
import HomeContainer from "./pages/home/HomeContainer";
import UserlistContainer from "./pages/userlist/UserlistContainer";
import MessageContainer from "./pages/message/MessageContainer";
import PostContainer from "./pages/post/PostContainer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserContainer/>}>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
        </Route>
        <Route path="/mydailylife" element={<MainContainer/>}>
            <Route path="home" element={<HomeContainer/>}/>
            <Route path='userlist' element={<UserlistContainer/>}/>
            {/* <Route path='search' element={<SearchContainer/>}/> */}
            {/* <Route path='message' element={<MessageContainer/>}/> */}
            <Route path='post' element={<PostContainer/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
