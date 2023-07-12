import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StarWars() {
	const [resources, setResources] = useState([]);
	const [resource, setResource] = useState("");
	const [id, setId] = useState("");
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get("https://swapi.dev/api/").then((response) => {
			setResources(Object.keys(response.data));
		});
	}, []);

	const handleResourceChange = (event) => {
		setResource(event.target.value);
	};

	const handleIdChange = (event) => {
		setId(event.target.value);
	};

	const handleButtonClick = () => {
		axios
			.get(`https://swapi.dev/api/${resource}/${id}`)
			.then((response) => {
				setData(response.data);
				navigate(`/${resource}/${id}`);
			})
			.catch((error) => {
				setError(true);
			});
	};

	return (
		<div class="container w-max mx-auto">
			<label class="font-sans text-xl mx-2 text-warning" htmlFor="resource">
				Choose a resource:
			</label>
			<select id="resource" value={resource} onChange={handleResourceChange}>
				<option value="">Select a resource</option>
				{resources.map((resource) => (
					<option key={resource} value={resource}>
						{resource}
					</option>
				))}
			</select>
			<label class="font-sans text-xl mx-2 text-secondary" htmlFor="id">
				Enter an ID:
			</label>
			<input
				class="mx-2 input-primary ring-1 w-min"
				type="number"
				id="id"
				value={id}
				onChange={handleIdChange}
			/>
			<button class="btn-primary mx-2 px-2" onClick={handleButtonClick}>
				Get Data
			</button>
			{error ? (
				<div>
					<h1 class="py-3 text-2xl text-center text-red">These aren't the droids you're looking for</h1>
					<img src="https://cdn4.iconfinder.com/data/icons/famous-characters-add-on-vol-1-flat/48/Famous_Character_-_Add_On_1-46-1024.png" width="200" height="200" alt="obi wan"/>
				</div>
			) : (
				data && (
					<div>
						<h2 class="text-primary font-bold py-2 text-2xl font-sans">
							{data.name}
						</h2>
						<li class="text-warning text-xl py-2 font-sans">
							Height: {data.height}
						</li>
						<li class="text-warning text-xl py-2 font-sans">
							Mass: {data.mass}
						</li>
						<li class="text-warning text-xl py-2 font-sans">
							Gender: {data.gender}
						</li>
					</div>
				)
			)}
		</div>
	);
}
export default StarWars;
