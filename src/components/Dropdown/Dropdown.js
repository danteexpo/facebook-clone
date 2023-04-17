import React from "react";
import Navbar from "../Navbar/Navbar";
import NavItem from "../NavItem/NavItem";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import "./Dropdown.css";

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

export default Dropdown;
