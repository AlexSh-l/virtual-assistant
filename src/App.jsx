import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from './components/Main';
import Nav from './components/Nav';
import Authorization from './components/Authorization';
import Profile from './components/Profile';
import Info from './components/Info';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/info" element={<Info />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
