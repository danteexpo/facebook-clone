import React from "react";

const Bookmark = ({ marks }) => {
	return (
		<>
			{marks.map(mark => (
				<div className="bookmark-item" key={mark.title}>
					<span className="bookmark-icon">
						<img src={mark.url} alt="" />
					</span>
					<p>{mark.title}</p>
				</div>
			))}
		</>
	);
};

export default Bookmark;
