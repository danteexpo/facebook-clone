import React from "react";
import { auth, db } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "../../hooks/useAuthContext";
import fbLink from "../../assets/link.svg";
import "./Login.scss";
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
		<main className="login-container">
			<header>
				<h1>facebook</h1>
				<p>Connect with friends and the world around you on Facebook.</p>
			</header>
			<section>
				<div className="wrapper">
					<button className="login-btn" onClick={handleSignUp}>
						Sign In with Google
					</button>
					<div className="forgot">
						<p className="actual-text">Forgot password?</p>
					</div>
					<a
						href="https://www.facebook.com/"
						target="_blank"
						rel="noreferrer"
						className="sign-up-btn"
					>
						<span>Real Facebook</span>
						<img src={fbLink} alt="" />
					</a>
				</div>
				<p className="after-text">
					<b>Create a Page</b> for a celebrity, brand or business.
				</p>
			</section>
		</main>
	);
};

export default Login;
