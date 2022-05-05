import React from "react";
import Bookmarks from "../Bookmarks/Bookmarks";
import Post from "./components/Post/Post";
import AddPost from "./components/AddPost/AddPost";
import Sidebar from "./components/Sidebar/Sidebar";
import { useCollection } from "../../hooks/useCollection";
import "./Home.scss";

const Home = () => {
	const { data: posts } = useCollection("posts", true);

	return (
		<div className="home-container">
			<div className="bookmark-column">
				<Bookmarks />
			</div>
			<div className="main-column">
				<div>
					<AddPost />
				</div>
				{posts && (
					<div>
						<Post posts={posts} />
					</div>
				)}
			</div>
			<div className="sidebar-column">
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;
