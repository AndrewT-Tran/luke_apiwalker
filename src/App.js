import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import StarWars from "./components/StarWars";

function App() {
	// navigators are different from Link to in that they can be trggered by anything,
	return (
		<div className="App">
			<h1 class="text-warning text-6xl text-center my-6">Welcome !</h1>
		<StarWars />

		</div>
	);
}

export default App;
