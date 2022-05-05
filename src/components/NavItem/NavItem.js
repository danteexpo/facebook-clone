import { useState } from "react";

export default function NavItem(props) {
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
