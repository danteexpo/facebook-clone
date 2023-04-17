import React from "react";
import LikeIcon from "../../../../assets/post-like.svg";
import LoveIcon from "../../../../assets/post-love.svg";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { db } from "../../../../firebase/config";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../../../../hooks/useAuthContext";

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
				<div key={post.id} className="my-4 mx-auto min-w-[400px] max-w-[600px] rounded-lg bg-[#242526]">
					<div className="py-2 px-0 pl-2 flex items-center gap-2">
						{post.photoURL && (
							<img
								src={post.photoURL}
								alt=""
								style={{ height: 40, borderRadius: 9999 }}
							/>
						)}
						<div className="text-sm font-bold">
							<p>{post.displayName}</p>
							<p className="text-[#dadce1] text-xs font-normal">
								{post.timestamp &&
									formatDistanceToNow(post.timestamp.toDate(), {
										addSuffix: true,
									})}
							</p>
						</div>
					</div>
					<div className="py-2 px-0 pl-2">
						<p>{post.content}</p>
					</div>
					{post.imageURL && (
						<div>
							<img src={post.imageURL} alt="" style={{ width: "100%" }} />
						</div>
					)}
					<hr className="hr pt-2" />
					<div className="min-h-[50px] grid grid-cols-2 place-items-center">
						<div className="flex justify-center items-center">
							<span onClick={() => handleLikes(post.id)} className="flex justify-center items-center gap-1.5 p-2 rounded-lg cursor-pointer hover:bg-[#484a4d]">
								<img src={LikeIcon} alt="" className="w-4" />
								<p>Like</p>
							</span>
							{post.likes && (
								<div className="rounded-full bg-[#f3425f] font-bold flex justify-center items-center ml-2 py-0.5 px-1.5 cursor-pointer">{post.likes.length}</div>
							)}
						</div>
						<div className="flex justify-center items-center">
							<span onClick={() => handleLoves(post.id)} className="flex justify-center items-center gap-1.5 p-2 rounded-lg cursor-pointer hover:bg-[#484a4d]">
								<img src={LoveIcon} alt="" className="w-4" />
								<p>Love</p>
							</span>
							{post.loves && (
								<div className="rounded-full bg-[#f3425f] font-bold flex justify-center items-center ml-2 py-0.5 px-1.5 cursor-pointer">{post.loves.length}</div>
							)}
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Post;
