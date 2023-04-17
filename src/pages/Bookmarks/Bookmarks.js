import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Bookmark from "../../components/Bookmark/Bookmark";

const marks = [
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png",
		title: "Friends",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png",
		title: "Groups",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png",
		title: "Watch",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/DHBHg9MEeSC.png",
		title: "Ads Manager",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/SWt1APlIN82.png",
		title: "Films",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/MN5ZSGIfEZ3.png",
		title: "Friend Lists",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/kOxV5aCYUAE.png",
		title: "COVID-19 Information Center",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/Doj4fJpfxHx.png",
		title: "Business Suite",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/cT5nPnO8Wsc.png",
		title: "Crisis Response",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/n2vd2VduYc1.png",
		title: "Fundraisers",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PObY9OA5lvJ.png",
		title: "Games",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png",
		title: "Messenger",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/1Xvrz50fHMF.png",
		title: "Messenger Kids",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/w-vdKCGzCy1.png",
		title: "Most Recent",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/NYOGcd-z-qs.png",
		title: "Offers",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png",
		title: "Pages",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/8OasGoQgQgF.png",
		title: "Recent Ad Activity",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png",
		title: "Saved",
	},
	{
		url: "https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/bo0Zt72NIra.png",
		title: "Weather",
	},
];

const Bookmarks = () => {
	const { user } = useAuthContext();

	return (
		<div className="pt-3 flex flex-col gap-3">
			<div className="cursor-pointer h-8 flex items-center rounded-lg transition-all duration-500 p-2 hover:bg-[#525357]mr-2 hover:filter-none">
				<span className="mr-2 hover:filter-none">
					{user.photoURL && <img src={user.photoURL} alt="" className="w-7 rounded-full" />}
				</span>
				<p>{user.displayName}</p>
			</div>
			<Bookmark marks={marks} />
		</div>
	);
};

export default Bookmarks;
