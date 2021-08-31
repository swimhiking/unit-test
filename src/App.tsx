import React, { useState } from "react";

import "./App.css";

function App() {
	const [str, setStr] = useState("initial string");
	const onChange = () => {
		setStr("new string");
	};
	return (
		<div className="App">
			<header className="App-header"></header>
			<div>
				<button onClick={onChange}>
					Change Text Btn
				</button>
			</div>
			<div>{str}</div>
		</div>
	);
}

export default App;
