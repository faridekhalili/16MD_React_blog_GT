import {useState} from 'react';
import axios from 'axios';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {nanoid} from 'nanoid';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL = 'http://localhost:3004';

export const Comments = (props: any) => {
    const notifyCommentedAdded = () => toast('Comment added!');
    const notifyCommentedDeleted = () => toast('Comment deleted!');
    const [formData, setFormData] = useState({
        comment: '',
        author: '',
    });

    // Access the client
    const queryClient = useQueryClient();

    const fetchComments = async () => {
        const res = await axios.get(`${URL}/comments?postId=${props.postId}`);
        return res.data;
    };

    // Queries
    const {isLoading, error, data} = useQuery(['comments'], fetchComments);

    // Add the comment
    const addComment = useMutation({
        mutationFn: (newComment) => {
            return axios.post(`${URL}/comments`, newComment);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['comments']});
        },
    });

    // Delete the comment
    const deleteComment = useMutation({
        mutationFn: (id) => {
            return axios.delete(`${URL}/comments/${id}`);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({queryKey: ['comments']});
        },
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prev) => {
            return {...prev, [name]: value};
        });
    };

    const removeComment = (id: any) => {
        deleteComment.mutate(id);
        notifyCommentedDeleted();
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newComment: any = {
            id: nanoid(),
            comment: formData.comment,
            author: formData.author,
            postId: props.postId,
        };
        addComment.mutate(newComment);
        notifyCommentedAdded();
        e.target.reset();
    };

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>An error has occurred.</h1>;

    return (
        <div className='maxWith'>
            {data.map((data: any) => (
                <div key={nanoid()}>
                    <p>{data.comment}</p>
                    <p>Comment by: {data.author}</p>
                    <button onClick={() => removeComment(data.id)}>Delete</button>
                    <hr />
                </div>
            ))}
            {/* ADD COMMENT */}
            <div className='centerContent'>
                <p>
                    <b>Add comment</b>
                </p>
                <form className='centerContent' onSubmit={handleSubmit}>
                    <label>
                        <textarea onChange={handleChange} required name='comment' rows={3} cols={87} />
                    </label>
                    {/* <br /> */}
                    <div>
                        <label>
                            Your name: &nbsp;
                            <input
                                className='inputFieldSize'
                                onChange={handleChange}
                                type='text'
                                required
                                name='author'
                                size={15}
                            />
                        </label>
                        <button className='button button1' type='submit'>
                            Add comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
