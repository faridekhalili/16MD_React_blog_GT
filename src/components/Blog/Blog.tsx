import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {nanoid} from 'nanoid';
import {NavBar} from '../NavBar/NavBar';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = 'http://localhost:3004/posts';

export const Blog = () => {
    const notifyAdded = () => toast('Post added!');
    const [addPost, setAddPost] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        content: '',
        author: '',
    });

    // Access the client
    const queryClient = useQueryClient();

    const fetchPosts = async () => {
        const res = await axios.get(URL);
        return res.data;
    };

    // Queries
    const {isLoading, error, data} = useQuery(['blog'], fetchPosts);

    // Mutations
    const mutation = useMutation({
        mutationFn: (newPost) => {
            return axios.post(URL, newPost);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['blog']});
        },
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prev) => {
            return {...prev, [name]: value};
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newPost: any = {
            id: nanoid(),
            title: formData.title,
            image: formData.image,
            content: formData.content,
            author: formData.author,
        };
        mutation.mutate(newPost);
        setAddPost(false);
        notifyAdded();
    };

    const openAddForm = (e: any) => {
        e.preventDefault();
        setAddPost(true);
    };

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>An error has occurred.</h1>;

    return (
        <div>
            <>
                <div className='addPostButtonContainer'>
                    <div>
                        <NavBar />
                    </div>
                    <div className='addAlignRight'>
                        {!addPost && (
                            <button className='button button4' onClick={openAddForm}>
                                Add post
                            </button>
                        )}
                    </div>
                </div>
                {/* ADD POST */}
                {addPost && (
                    <div className='addPostFormContainer'>
                        <h1>Add Post</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title:
                                <input
                                    required
                                    type='text'
                                    name='title'
                                    placeholder='Post title..'
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Image:
                                <input
                                    required
                                    type='url'
                                    name='image'
                                    placeholder='Post image link..'
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Author:
                                <input
                                    required
                                    type='text'
                                    name='author'
                                    placeholder='Your name..'
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Comment:
                                <br />
                                <textarea
                                    required
                                    rows={3}
                                    cols={87}
                                    // type='text'
                                    name='content'
                                    placeholder='Post comment..'
                                    onChange={handleChange}
                                />
                            </label>
                            <div className='centerButtons'>
                                <button className='button button1'>Submit</button>
                                <button className='button button3' onClick={() => setAddPost(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </>
            {/* RENDER POSTS */}
            <ToastContainer />
            <div className='postGrid'>
                {data.map((post: any) => (
                    <div className='gridCard' key={post.id}>
                        <Link
                            to={`/posts/${post.id}`}
                            state={{
                                id: {
                                    id: post.id,
                                    title: post.title,
                                    image: post.image,
                                    content: post.content,
                                    author: post.author,
                                },
                            }}
                        >
                            <img className='postImage' src={post.image} alt={post.title} />
                        </Link>
                        <div className='cardText'>
                            <h2>{post.title}</h2>
                            <p className='cutoffText'>{post.content}</p>
                            <Link
                                to={`/posts/${post.id}`}
                                state={{
                                    id: {
                                        id: post.id,
                                        title: post.title,
                                        image: post.image,
                                        content: post.content,
                                        author: post.author,
                                    },
                                }}
                            >
                                <p className='textAlignRight'>Read more...</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
