import React, { useState } from "react";
import CameraPost from "../../../../assets/camera-post.svg";
import ImagePost from "../../../../assets/image-post.svg";
import GrayImagePost from "../../../../assets/image-post-gray.svg";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { db, storage } from "../../../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
		<div className={`my-4 mx-auto min-h-[124px] min-w-[400px] max-w-[600px] rounded-lg bg-[#242526] text-[#dadce1] grid ${file ? "grid-rows-[1fr_1fr_1px_1fr]" : "grid-rows-[1fr_1px_1fr]"}`}>
			<div className="flex justify-start items-center gap-2 py-2 px-0 pl-2">
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
					className="w-full bg-[#484a4d] p-3 mr-2 text-base text-[#dadce1] border-none rounded-full cursor-pointer placeholder:text-[#dadce1] focus:outline-none hover:bg-[#525357]"
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

			<hr className="border-b-[1px] border-b-[#484a4d]" />

			<div className="grid grid-cols-3 place-items-center">
				<span className="flex justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-[#484a4d]">
					<img src={CameraPost} alt="" className="w-7 mr-3" />
					<p className="text-sm font-bold">Live Video</p>
				</span>
				<span className="flex justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-[#484a4d]">
					<label htmlFor="file-upload" className="flex items-center cursor-pointer">
						<img src={ImagePost} alt="" className="w-7 mr-3" />
						<p className="text-sm font-bold">Photo/Video</p>
					</label>
					<input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
				</span>
				{isPending && (
					<button className="border-none text-white text-sm font-bold py-3 px-12 rounded-full cursor-not-allowed bg-[#484a4d]" disabled>
						Loading...
					</button>
				)}
				{!isPending && (
					<button className="border-none text-white text-sm font-bold py-3 px-12 rounded-full cursor-pointer bg-[#0080ff]" onClick={handleSubmit}>
						Post
					</button>
				)}
			</div>
		</div>
	);
};

export default AddPost;
