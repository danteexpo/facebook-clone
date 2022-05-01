import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dropdown from "./components/Dropdown/Dropdown";
import Home from "./pages/Home/Home";
import Bookmarks from "./pages/Bookmarks/Bookmarks";
import Login from "./pages/Login/Login";

function App() {
	return (
		<Router>
			<Dropdown />
			<Routes>
				{/* <Route path="/login" element={<Login />} /> */}
				<Route path="/" element={<Home />} />
				<Route path="/bookmarks" element={<Bookmarks />} />
			</Routes>
		</Router>
	);
}

export default App;
