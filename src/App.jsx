import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
<<<<<<< HEAD
import WritePopup from './components/WritePopup';
=======
import Write from './pages/Write';
>>>>>>> 2f7d257dc862068ddf3f4a557f7a6a3cf99130bb
import Posts from './pages/Posts';
import PostDetailPopup from './components/PostDetailPopup';
import Categories from './pages/Categories';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/write" element={<WritePopup />} />
=======
        <Route path="/write" element={<Write />} />
>>>>>>> 2f7d257dc862068ddf3f4a557f7a6a3cf99130bb
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