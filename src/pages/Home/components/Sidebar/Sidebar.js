import React from "react";
import searchLogo from "../../../../assets/search-logo.svg";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import "./Sidebar.scss";

const Sidebar = () => {
	const { data: users } = useCollection("users", false);
	const { user } = useAuthContext();

	return (
		<div className="contacts-container">
			<div className="contacts-searchbar">
				<h4>Contacts</h4>
				<img src={searchLogo} alt="" style={{ width: 16 }} />
			</div>
			<ul className="contacts-list">
				{users &&
					users.map(eachUser => {
						if (user.displayName !== eachUser.displayName) {
							return (
								<li key={Math.random()} className="user-container">
									<span
										className={`user-image-container ${
											eachUser.online && "user-online"
										}`}
									>
										{eachUser.photoURL && (
											<img
												src={eachUser.photoURL}
												alt=""
												className="user-image"
											/>
										)}
									</span>
									<span>{eachUser.displayName}</span>
								</li>
							);
						}
						return true;
					})}
			</ul>
		</div>
	);
};

export default Sidebar;
