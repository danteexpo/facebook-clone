import React from "react";
import "./Login.scss";

const Login = () => {
	return (
		<main className="login-container">
			<header>
				<h1>facebook</h1>
				<p>Connect with friends and the world around you on Facebook.</p>
			</header>
			<section>
				<div className="wrapper">
					<button className="login-btn">Log In with Google</button>
					<p className="forgot">
						<p className="actual-text">Forgot password?</p>
					</p>
					<button className="sign-up-btn">Sign Up with Google</button>
				</div>
				<p className="after-text">
					<b>Create a Page</b> for a celebrity, brand or business.
				</p>
			</section>
		</main>
	);
};

export default Login;
