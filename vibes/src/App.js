import "./App.css";
import MockAPI from './Mockman/Mockman';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Explore, SingleVideo, History, Liked, Playlist, PlaylistListing, WatchLater, Error, Profile } from './Pages';
import { MainComponent, RequireAuth } from "./Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <MainComponent />
      <div className="page-body">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<MockAPI/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<SingleVideo/>} />
        <Route element={<RequireAuth />}>
          <Route path="/liked" element={<Liked />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:id" element={<PlaylistListing />} />
          <Route path="/watchlater" element={<WatchLater />} />
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
