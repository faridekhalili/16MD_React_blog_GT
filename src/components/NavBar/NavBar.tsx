import {Link} from 'react-router-dom';

export const NavBar = () => {
    return (
        <div>
            <ul className='navBarContainer'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/blog'>Blog</Link>
                </li>
            </ul>
        </div>
    );
};
