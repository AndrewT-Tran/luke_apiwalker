import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StarWars() {
	const [resources, setResources] = useState([]);
	const [resource, setResource] = useState("");
	const [id, setId] = useState("");
	const [data, setData] = useState(null);
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
				if (resource === "people") {
					axios.get(response.data.homeworld).then((homeworldResponse) => {
						setData((prevData) => ({
							...prevData,
							homeworld: homeworldResponse.data.name,
						}));
					});
				}
				navigate(`/${resource}/${id}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="container w-max mx-auto">
			<label className="font-sans text-xl mx-2 text-warning" htmlFor="resource">
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
			<label className="font-sans text-xl mx-2 text-secondary" htmlFor="id">
				Enter an ID:
			</label>
			<input
				className="mx-2 input-primary ring-1 w-min"
				type="number"
				id="id"
				value={id}
				onChange={handleIdChange}
			/>
			<button className=" btn btn-success mx-2 px-1" onClick={handleButtonClick}>
				Get Data
			</button>
			{data && (
				<div>
					<h2 className="text-primary font-bold py-1 text-2xl font-sans">
						{data.name}
					</h2>
					{resource === "people" && (
						<li className="text-warning text-xl py-2 font-sans">
							Homeworld: {data.homeworld}
						</li>
					)}
					<li className="text-warning text-xl py-2 font-sans">
						Height: {data.height}
					</li>
					<li className="text-warning text-xl py-2 font-sans">
						Mass: {data.mass}
					</li>
					<li className="text-warning text-xl py-2 font-sans">
						Gender: {data.gender}
					</li>
				</div>
			)}
		</div>
	);
}

export default StarWars;
