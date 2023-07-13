import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import StarWars from "./components/StarWars";
import PlanetInfo from "./components/Planet";
function App() {
	// navigators are different from Link to in that they can be trggered by anything,
	return (
		<div className="App">
			<h1 class="text-warning text-5xl text-center my-6">
				<span className="text-primary">Welcome to </span>

				Luke API Walker</h1>
			<StarWars />

		</div>
	);
}

export default App;
