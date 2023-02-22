import {useLocation} from 'react-router-dom';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Comments} from '../Comments/Comments';
import {NavBar} from '../NavBar/NavBar';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Post: any = () => {
    const notifyDeleted = () => toast('Post deleted!');
    const notifyEdited = () => toast('Post edited!');
    const [editPost, setEditPost] = useState(false);
    const navigate = useNavigate();
    let {state} = useLocation();

    const [editFormData, setEditFormData] = useState({
        title: state.id.title,
        image: state.id.image,
        content: state.id.content,
        author: state.id.author,
    });

    const URL = 'http://localhost:3004/posts';

    // Access the client
    const queryClient = useQueryClient();

    const fetchPost = async () => {
        const res = await axios.get(`${URL}/${state.id.id}`);
        return res.data;
    };

    // Queries
    const {isLoading, error, data} = useQuery(['singlePost'], fetchPost);

    // Add Post
    const mutation = useMutation({
        mutationFn: (newPost) => {
            return axios.patch(`${URL}/${state.id.id}`, newPost);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['xblog']});
        },
    });

    // Add Post
    const mutatePut = useMutation({
        mutationFn: (newComment) => {
            return axios.put(`${URL}/${state.id.id}`, newComment);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['xblog']});
        },
    });

    // Delete Post
    const deletePost = useMutation({
        mutationFn: (id) => {
            return axios.delete(`${URL}/${id}`);
        },
        onSuccess: () => {
            navigate('/blog');
        },
    });

    if (isLoading) return <h1>Loading...</h1>;

    // if (error) return 'An error has occurred: ' + error.message;
    if (error) return <h1>An error has occurred.</h1>;

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setEditFormData((prev) => {
            return {...prev, [name]: value};
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newPost: any = {
            id: state.id.id,
            title: editFormData.title,
            image: editFormData.image,
            content: editFormData.content,
            author: editFormData.author,
        };
        mutation.mutate(newPost);
        setEditPost(false);
        notifyEdited();
        setTimeout(() => {
            navigate('/blog');
            queryClient.invalidateQueries({queryKey: ['xblog']});
        }, 1000);
    };

    const handleDelete = (e: any) => {
        e.preventDefault();
        // console.log(state.id.id);
        notifyDeleted();
        setTimeout(() => {
            deletePost.mutate(state.id.id);
        }, 1000);
    };

    const openEditForm = (e: any) => {
        e.preventDefault();
        setEditPost(true);
    };

    const cancelEditPost = (e: any) => {
        e.preventDefault();
        navigate('/blog');
    };

    const postProps = {postId: state.id.id};
    return (
        <div>
            <div className='addPostButtonContainer'>
                <div>
                    <NavBar />
                </div>
                <div className='addAlignRight'>
                    {/* DELETE POST */}
                    <button className='button button3' onClick={handleDelete}>
                        Delete post
                    </button>
                    {!editPost && (
                        <button className='button button1' onClick={openEditForm}>
                            Edit post
                        </button>
                    )}
                </div>
            </div>

            <div className='deleteEditPostContainer'>
                {/* <pre>{JSON.stringify(data)}</pre> */}

                {/* EDIT POST */}
                {editPost && (
                    <div className='editPostFormContainer'>
                        <h1>Edit Post</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Title: &nbsp;
                                <input
                                    required
                                    type='text'
                                    name='title'
                                    defaultValue={state.id.title}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Image link: &nbsp;
                                <input
                                    required
                                    type='url'
                                    name='image'
                                    defaultValue={state.id.image}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Your name: &nbsp;
                                <input
                                    required
                                    type='text'
                                    name='author'
                                    defaultValue={state.id.author}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <label>
                                Post content:
                                <br />
                                <textarea
                                    required
                                    // type='text'
                                    name='content'
                                    defaultValue={state.id.content}
                                    onChange={handleChange}
                                    rows={3}
                                    cols={99}
                                />
                            </label>
                            <div className='centerButtons'>
                                <button className='button button1'>Submit</button>
                                <button className='button button3' onClick={cancelEditPost}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {/* RENDER POSTS */}
            <div className='deleteEditPostContainer'>
                <ToastContainer />
                <div className='singlePost'>
                    <img className='singlePostImage' src={data.image} alt={data.title} />
                    <div className='singleCardText'>
                        <h2>{data.title}</h2>
                        <p>{data.content}</p>
                        <p>Author: {data.author}</p>
                    </div>
                    {/* COMMETNS FIELD */}
                </div>
            </div>
            <div className='deleteEditPostContainer'>
                <div className='commentsContainer'>
                    <Comments {...postProps} />
                </div>
            </div>
        </div>
    );
};

// PERSONAL NOTES:
// https://www.positronx.io/react-query-handle-delete-request-with-usemutation-tutorial/
