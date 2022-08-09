import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Main />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
