import { Link, useLocation } from "react-router-dom";
import MainHome from "../../assets/main-home.svg";
import MainFriends from "../../assets/main-friends.svg";
import MainShop from "../../assets/main-shop.svg";
import MainCommunity from "../../assets/main-community.svg";
import MainGame from "../../assets/main-game.svg";
import facebookLogo from "../../assets/facebook-logo.svg";
import searchLogo from "../../assets/search-logo.svg";
import burgerMenu from "../../assets/burger-menu.svg";

export default function Navbar(props) {
	let { pathname } = useLocation();

	return (
		<nav className="navbar">
			<div className="searchbar-container">
				<Link to="/" className="link-container">
					<img src={facebookLogo} alt="" className="facebook-img" />
				</Link>
				<div className="searchbar">
					<img src={searchLogo} alt="" />
					<p>Search Facebook</p>
				</div>
				<Link
					to={pathname === "/" ? "/bookmarks" : "/"}
					className={`link-container ${
						pathname === "/bookmarks" ? "burger-active" : ""
					}`}
				>
					<img src={burgerMenu} alt="" className="burger-img" />
				</Link>
			</div>

			<div className="main-doc">
				<div className="main-doc-first">
					<img src={MainHome} alt="" />
				</div>
				<div>
					<img src={MainFriends} alt="" />
				</div>
				<div>
					<img src={MainShop} alt="" />
				</div>
				<div>
					<img src={MainCommunity} alt="" />
				</div>
				<div>
					<img src={MainGame} alt="" />
				</div>
			</div>

			<ul className="navbar-nav">{props.children}</ul>
		</nav>
	);
}
