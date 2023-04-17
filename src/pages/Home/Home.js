import React from "react";
import Bookmarks from "../Bookmarks/Bookmarks";
import Post from "./components/Post/Post";
import AddPost from "./components/AddPost/AddPost";
import Sidebar from "./components/Sidebar/Sidebar";
import { useCollection } from "../../hooks/useCollection";
import "./Home.css";

const Home = () => {
	const { data: posts } = useCollection("posts", true);

	return (
		<div className="my-0 mx-auto grid grid-cols-1 md:grid-cols-[1fr_600px_1fr_250px] lg:grid-cols-[250px_1fr_500px_1fr_250px] xl:grid-cols-[250px_1fr_600px_1fr_250px]">
			<div className="hidden fixed overflow-y-scroll top-16 bottom-0 lg:block bookmark-column">
				<Bookmarks />
			</div>
			<div className="md:col-start-2 md:col-end-2 lg:col-start-3 lg:col-end-3">
				<div>
					<AddPost />
				</div>
				{posts && (
					<div>
						<Post posts={posts} />
					</div>
				)}
			</div>
			<div className="hidden w-60 fixed overflow-y-scroll right-0 top-16 bottom-0 col-start-4 col-end-4 md:flex lg:col-start-5 lg:col-end-5 sidebar-column">
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;
