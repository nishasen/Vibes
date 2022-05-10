import "./App.css";
import MockAPI from './Mockman/Mockman';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Signup, Explore, SingleVideo, History, Liked, Playlist, PlaylistListing, WatchLater } from './Pages';
import { RequireAuth } from "./Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<MockAPI/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/video/:id" element={<SingleVideo/>} />
        <Route path="/history" element={<RequireAuth><History/></RequireAuth>} />
        <Route path="/liked" element={<RequireAuth><Liked /></RequireAuth>} />
        <Route path="/playlist" element={<RequireAuth><Playlist/></RequireAuth>} />
        <Route path="/playlist/:id" element={<RequireAuth><PlaylistListing/></RequireAuth>} />
        <Route path="/watchlater" element={<RequireAuth><WatchLater/></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
