import "./App.css";
import MockAPI from './Mockman/Mockman';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
     Hello world
     <Routes>
      <Route path="/mockman" element={<MockAPI/>} />
     </Routes>
    </div>
  );
}
//#03989E

export default App;
