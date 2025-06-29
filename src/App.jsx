import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WritePopup from './components/WritePopup';
import Posts from './pages/Posts';
import PostDetailPopup from './components/PostDetailPopup';
import Categories from './pages/Categories';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/write" element={<WritePopup />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetailPopup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<HomePage />} />
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;