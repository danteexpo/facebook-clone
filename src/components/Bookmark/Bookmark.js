import React from "react";

const Bookmark = ({ marks }) => {
	return (
		<>
			{marks.map(mark => (
			<div className="cursor-pointer h-8 flex items-center rounded-lg transition-all duration-500 p-2 hover:bg-[#525357]mr-2 hover:filter-none" key={mark.title}>
					<span className="mr-2 hover:filter-none">
						<img src={mark.url} alt="" className="w-7 rounded-full" />
					</span>
					<p>{mark.title}</p>
				</div>
			))}
		</>
	);
};

export default Bookmark;
