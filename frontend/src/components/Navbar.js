import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleClick = () => {
		logout();
	};

	return (
		<header>
			<div className="container">
				<Link to={'/'}>Workout Buddy</Link>
				<nav>
					{user ? (
						<div>
							<span>{user.email}</span>
							<button onClick={handleClick}>Log out</button>
						</div>
					) : (
						<div>
							<Link to={'/login'}>Login</Link>
							<Link to={'/signup'}>Signup</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
};
export default Navbar;
