import {Home} from './components/Home/Home';
import {Blog} from './components/Blog/Blog';
import {Routes, Route} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {Post} from './components/Post/Post';
import axios from 'axios';

const URL = 'http://localhost:3004/posts';

function App() {
    const fetchPosts = async () => {
        const res = await axios.get(URL);
        return res.data;
    };

    useQuery(['xblog'], fetchPosts);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/posts/:id' element={<Post />} />
            </Routes>
        </>
    );
}

export default App;

// TODO:
// CSS styling needs work
// code refactoring
// TanStack Query optimization
