import React, { useState } from "react";
import CameraPost from "../../../../assets/camera-post.svg";
import ImagePost from "../../../../assets/image-post.svg";
import GrayImagePost from "../../../../assets/image-post-gray.svg";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { db, storage } from "../../../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./AddPost.scss";

const AddPost = () => {
	const [input, setInput] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [file, setFile] = useState(null);
	const [fileError, setFileError] = useState(null);
	const { user } = useAuthContext();
	const [firstName] = user.displayName.split(" ");

	const handleFileChange = e => {
		setFile(null);
		let selected = e.target.files[0];
		if (!selected.type.includes("image")) {
			setFileError("Selected file must be an image");
			return;
		}
		if (selected.size > 1000000) {
			setFileError("Selected file must be less than 1mb");
			return;
		}
		setFileError(null);
		setFile(selected);
	};

	const handleSubmit = async () => {
		setIsPending(true);

		if (input || file) {
			// getting an image url
			let imgUrl = null;
			if (file) {
				const storageRef = await ref(
					storage,
					`postImages/${user.uid}/${file.name}`,
				);
				await uploadBytesResumable(storageRef, file);
				imgUrl = await getDownloadURL(storageRef);
			}

			// uploading document
			const otherRef = collection(db, "posts");
			await addDoc(otherRef, {
				content: input,
				displayName: user.displayName,
				photoURL: user.photoURL,
				imageURL: imgUrl,
				timestamp: serverTimestamp(),
			});

			setInput("");
			setFile(null);
			setIsPending(false);
		} else {
			setIsPending(false);
		}
	};

	return (
		<div className={`${file ? "add-container-photo" : "add-container"}`}>
			<div className="first-row">
				{user.photoURL && (
					<img
						src={user.photoURL}
						alt=""
						style={{ height: 40, borderRadius: 9999 }}
					/>
				)}
				<input
					onChange={e => setInput(e.target.value)}
					value={input}
					placeholder={`What are you thinking about, ${firstName}?`}
				/>
			</div>

			{fileError && (
				<div>
					<p style={{ padding: "0.5rem" }}>{fileError}</p>
				</div>
			)}
			{file && (
				<div
					style={{
						marginLeft: "0.5rem",
						display: "flex",
						alignItems: "center",
					}}
				>
					<img src={GrayImagePost} alt="" style={{ width: 32 }} />
					<p style={{ padding: "0.5rem" }}>{file.name}</p>
				</div>
			)}

			<hr className="hr" />

			<div className="second-row">
				<span>
					<img src={CameraPost} alt="" />
					<p>Live Video</p>
				</span>
				<span>
					<label htmlFor="file-upload">
						<img src={ImagePost} alt="" />
						<p>Photo/Video</p>
					</label>
					<input id="file-upload" type="file" onChange={handleFileChange} />
				</span>
				{isPending && (
					<button className="post-btn" disabled>
						Loading...
					</button>
				)}
				{!isPending && (
					<button className="post-btn-active" onClick={handleSubmit}>
						Post
					</button>
				)}
			</div>
		</div>
	);
};

export default AddPost;
