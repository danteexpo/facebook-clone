import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as LockIcon } from "./icons/lock.svg";
import { ReactComponent as NewsIcon } from "./icons/newspaper.svg";
import { ReactComponent as ListIcon } from "./icons/list.svg";
import { ReactComponent as LanguageIcon } from "./icons/language.svg";
import { ReactComponent as MoonIcon } from "./icons/moon.svg";
import { ReactComponent as CompactIcon } from "./icons/compact.svg";
import { ReactComponent as KeyboardIcon } from "./icons/keyboard.svg";
import { ReactComponent as DoorIcon } from "./icons/door.svg";
import MainHome from "../../assets/main-home.svg";
import MainFriends from "../../assets/main-friends.svg";
import MainShop from "../../assets/main-shop.svg";
import MainCommunity from "../../assets/main-community.svg";
import MainGame from "../../assets/main-game.svg";
import facebookLogo from "../../assets/facebook-logo.svg";
import searchLogo from "../../assets/search-logo.svg";
import burgerMenu from "../../assets/burger-menu.svg";
import { Link, useLocation } from "react-router-dom";
import "./Dropdown.scss";

const Dropdown = () => {
	return (
		<Navbar>
			<NavItem icon={<PlusIcon />} />
			<NavItem icon={<MessengerIcon />} />
			<NavItem icon={<BellIcon />} />

			<NavItem icon={<CaretIcon />}>
				<DropdownMenu></DropdownMenu>
			</NavItem>
		</Navbar>
	);
};

function Navbar(props) {
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
				<img src={MainFriends} alt="" />
				<img src={MainShop} alt="" />
				<img src={MainCommunity} alt="" />
				<img src={MainGame} alt="" />
			</div>

			<ul className="navbar-nav">{props.children}</ul>
		</nav>
	);
}

function NavItem(props) {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item">
			<p className="icon-button" onClick={() => setOpen(!open)}>
				{props.icon}
			</p>

			{open && props.children}
		</li>
	);
}

function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	function DropdownItem(props) {
		return (
			<p
				className="menu-item"
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
			>
				<span className="icon-button">{props.leftIcon}</span>
				{props.children}
				<span className="icon-right">{props.rightIcon}</span>
			</p>
		);
	}

	return (
		<div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
			<CSSTransition
				in={activeMenu === "main"}
				timeout={500}
				classNames="menu-primary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem>Dante Expósito</DropdownItem>
					<DropdownItem
						leftIcon={<CogIcon />}
						rightIcon={<ChevronIcon />}
						goToMenu="settings"
					>
						Settings
					</DropdownItem>
					<DropdownItem
						leftIcon={<MoonIcon />}
						rightIcon={<ChevronIcon />}
						goToMenu="animals"
					>
						Visuals
					</DropdownItem>
					<DropdownItem leftIcon={<DoorIcon />}>Logout</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === "settings"}
				timeout={500}
				classNames="menu-secondary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
						<h2>Settings</h2>
					</DropdownItem>
					<DropdownItem leftIcon={<CogIcon />}>Configuration</DropdownItem>
					<DropdownItem leftIcon={<LockIcon />}>Privacy Center</DropdownItem>
					<DropdownItem leftIcon={<ListIcon />}>Activity History</DropdownItem>
					<DropdownItem leftIcon={<NewsIcon />}>News Preferences</DropdownItem>
				</div>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === "animals"}
				timeout={500}
				classNames="menu-secondary"
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className="menu">
					<DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
						<h2>Visuals</h2>
					</DropdownItem>
					<DropdownItem leftIcon={<MoonIcon />}>Dark Mode</DropdownItem>
					<DropdownItem leftIcon={<CompactIcon />}>Compact Mode</DropdownItem>
					<DropdownItem leftIcon={<KeyboardIcon />}>Keyboard</DropdownItem>
					<DropdownItem leftIcon={<LanguageIcon />}>Language</DropdownItem>
				</div>
			</CSSTransition>
		</div>
	);
}

export default Dropdown;
