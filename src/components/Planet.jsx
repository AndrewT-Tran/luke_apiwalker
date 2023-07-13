import React, { useState, useEffect } from "react";
import axios from "axios";

const PlanetInfo = () => {
    const [planets, setPlanets] = useState([]);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/planets/")
            .then((response) => {
                setPlanets(response.data.results);
            })
            .catch((error) => {
                setError(true);
            });
    }, []);

    const handlePlanetSelect = (planetUrl) => {
        setSelectedPlanet(planetUrl);
    };

    return (
        <div>
            {error && <p className="text-xl tex-danger">Error retrieving planet information.</p>}
            {!selectedPlanet && (
                <div>
                    <h2 className="text-accent">Select a planet:</h2>
                    <select className="input border border-secondary " onChange={(e) => handlePlanetSelect(e.target.value)}>
                        <option value="">Select a planet:</option>
                        {planets.map((planet) => (
                            <option key={planet.url} value={planet.url}>
                                {planet.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedPlanet && (
                <PlanetDetails planetUrl={selectedPlanet} />
            )}
        </div>
    );
};

const PlanetDetails = ({ planetUrl }) => {
    const [planet, setPlanet] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(planetUrl)
            .then((response) => {
                setPlanet(response.data);
            })
            .catch((error) => {
                setError(true);
            });
    }, [planetUrl]);

    return (
        <div>
            {error && <p>Error retrieving planet information.</p>}
            {planet && (
                <div>
                    <h2 className="text-primary from-primary-focus">{planet.name}</h2>
                    <p>Climate: {planet.climate}</p>
                    <p>Diameter: {planet.diameter}</p>
                    <p>Gravity: {planet.gravity}</p>
                    <p>Orbital Period: {planet.orbital_period}</p>
                    <p>Population: {planet.population}</p>
                    <p>Rotation Period: {planet.rotation_period}</p>
                    <p>Surface Water: {planet.surface_water}</p>
                    <p>Terrain: {planet.terrain}</p>
                    <h2 className="text-center text-accent-focus text-2xl py-3">Residents:</h2>



                    <ul>
                        {planet.residents.map((residentUrl) => (
                            <li key={residentUrl}>
                                <hr/>
                                <ResidentInfo residentUrl={residentUrl} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const ResidentInfo = ({ residentUrl }) => {
    const [resident, setResident] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(residentUrl)
            .then((response) => {
                setResident(response.data);
            })
            .catch((error) => {
                setError(true);
            });
    }, [residentUrl]);

    return (
			<div className="mx-auto py-2">
				{error && <p>Error retrieving resident information.</p>}
				{resident && (
					<div className="text-center py-2">

                            <h3 className="text-primary">{resident.name}</h3>

						<p>
							Height: <span className="text-secondary">{resident.height}</span>
						</p>
						<p>
							Mass: <span className="text-secondary">{resident.mass}</span>
						</p>
					</div>
				)}
			</div>
		);
};

export default PlanetInfo;