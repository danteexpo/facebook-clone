import React from "react";
import { auth, db } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "../../hooks/useAuthContext";
import fbLink from "../../assets/link.svg";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
	const { dispatch } = useAuthContext();

	const handleSignUp = async () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(res => {
				console.log(res);
				dispatch({ type: "LOGIN", payload: res.user });
				setDoc(doc(db, "users", res.user.uid), {
					displayName: res.user.displayName,
					photoURL: res.user.photoURL,
					online: true,
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<main className="min-h-screen flex flex-col justify-center items-center text-center lg:flex-row">
			<header className="mb-14 lg:text-start">
				<h1 className="text-6xl font-bold text-[#0080ff] mb-5 lg:text-7xl">facebook</h1>
				<p className="text-xl w-2/3 lg:text-2xl">Connect with friends and the world around you on Facebook.</p>
			</header>
			<section className="min-w-[276px] w-3/5 max-w-sm">
				<div className="w-full bg-[#242526] pt-4 pb-4 rounded mb-8">
					<button className="w-11/12 pt-3 pb-3 border-none rounded text-xl font-bold text-white bg-[#0080ff] mb-4 cursor-pointer hover:opacity-90" onClick={handleSignUp}>
						Sign In with Google
					</button>
					<div className="text-[#0080ff] text-sm mb-6">
						<p className="cursor-pointer hover:underline">Forgot password?</p>
					</div>
					<a
						href="https://www.facebook.com/"
						target="_blank"
						rel="noreferrer"
						className="no-underline p-3 border-none rounded text-lg font-bold text-white bg-[#42b72a] mb-2 cursor-pointer flex justify-center items-center w-max my-0 mx-auto hover:opacity-90"
					>
						<span>Real Facebook</span>
						<img src={fbLink} alt="" className="pl-2 w-5" />
					</a>
				</div>
				<p className="text-sm">
					<b className="cursor-pointer hover:underline">Create a Page</b> for a celebrity, brand or business.
				</p>
			</section>
		</main>
	);
};

export default Login;
