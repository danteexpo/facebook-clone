import React from "react";
import LikeIcon from "../../../../assets/post-like.svg";
import LoveIcon from "../../../../assets/post-love.svg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { db } from "../../../../firebase/config";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import "./Post.scss";

const Post = ({ posts }) => {
	const { user } = useAuthContext();
	const handleLikes = async id => {
		await setDoc(
			doc(db, "posts", id),
			{
				likes: arrayUnion(user.displayName),
			},
			{ merge: true },
		);
	};
	const handleLoves = async id => {
		await setDoc(
			doc(db, "posts", id),
			{
				loves: arrayUnion(user.displayName),
			},
			{ merge: true },
		);
	};

	return (
		<>
			{posts.map(post => (
				<div key={post.id} className="post-container">
					<div className="post-user">
						{post.photoURL && (
							<img
								src={post.photoURL}
								alt=""
								style={{ height: 40, borderRadius: 9999 }}
							/>
						)}
						<div className="post-name-and-date">
							<p>{post.displayName}</p>
							<p className="post-date">
								{post.timestamp &&
									formatDistanceToNow(post.timestamp.toDate(), {
										addSuffix: true,
									})}
							</p>
						</div>
					</div>
					<div className="post-content">
						<p>{post.content}</p>
					</div>
					{post.imageURL && (
						<div>
							<img src={post.imageURL} alt="" style={{ width: "100%" }} />
						</div>
					)}
					<hr className="hr" />
					<div className="post-engage">
						<div>
							<span onClick={() => handleLikes(post.id)}>
								<img src={LikeIcon} alt="" />
								<p>Like</p>
							</span>
							{post.likes && (
								<div className="post-likes">{post.likes.length}</div>
							)}
						</div>
						<div>
							<span onClick={() => handleLoves(post.id)}>
								<img src={LoveIcon} alt="" />
								<p>Love</p>
							</span>
							{post.loves && (
								<div className="post-loves">{post.loves.length}</div>
							)}
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Post;
