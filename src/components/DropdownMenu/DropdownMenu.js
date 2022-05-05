import { useEffect, useRef, useState } from "react";
import UserImg from "../UserImg/UserImg";
import { useAuthContext } from "../../hooks/useAuthContext";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CogIcon } from "../Dropdown/icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../Dropdown/icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../Dropdown/icons/arrow.svg";
import { ReactComponent as LockIcon } from "../Dropdown/icons/lock.svg";
import { ReactComponent as NewsIcon } from "../Dropdown/icons/newspaper.svg";
import { ReactComponent as ListIcon } from "../Dropdown/icons/list.svg";
import { ReactComponent as LanguageIcon } from "../Dropdown/icons/language.svg";
import { ReactComponent as MoonIcon } from "../Dropdown/icons/moon.svg";
import { ReactComponent as CompactIcon } from "../Dropdown/icons/compact.svg";
import { ReactComponent as KeyboardIcon } from "../Dropdown/icons/keyboard.svg";
import { ReactComponent as DoorIcon } from "../Dropdown/icons/door.svg";

export default function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);
	const { dispatch, user } = useAuthContext();

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	const handleSignOut = async () => {
		await setDoc(
			doc(db, "users", user.uid),
			{ online: false },
			{ merge: true },
		);

		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log("user signed out");
				dispatch({ type: "LOGOUT" });
			})
			.catch(error => {
				// An error happened.
				console.log(error);
			});
	};

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
					{user.photoURL && (
						<DropdownItem leftIcon={<UserImg source={user.photoURL} />}>
							{user.displayName}
						</DropdownItem>
					)}
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
					<div onClick={handleSignOut}>
						<DropdownItem leftIcon={<DoorIcon />}>Sign Out</DropdownItem>
					</div>
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
