import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [characters, setCharacters] = useState([]);
	const [name, setName] = useState("");

	//Muestra por la consola los valores que introducimos en el input
	function handleChange(e) {
		setName(e.target.value);
		console.log(e.target.value);
	}

	//Añade con el metodo concat lo que introducimos en el input y lo concatena en el array de characters(donde hay las tareas)
	function handleAdd() {
		setCharacters(characters.concat({ label: name, done: false }));
		setName("");
		console.log(characters);
	}

	//Del array de characters con el metodo filter retornamos un array sin el valor que hemos seleccionado
	function handleDelete(name) {
		console.log(name);

		setCharacters(characters.filter((item) => item.label !== name));
	}

	//Funcion que hace update a la lista de To-dos
	function updateApi(newList) {
		//codigo que voy a ejecutar
		console.log(newList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/joel", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
			});
	}

	//Función que muestra los datos que tenemos en la lista de To-dos
	useEffect(() => {
		//codigo que voy a ejecutar
		fetch("https://assets.breatheco.de/apis/fake/todos/user/joel", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				setCharacters(data);
			});
	}, []);

	//Use effect que tiene controlada el array de characters que si cambia este ejecuta la función de actualizar
	useEffect(() => {
		if (characters.length > 0) {
			updateApi(characters);
		}
	}, [characters]);

	return (
		<div className=" text-center m-2">
			<AddItem name={name} onChange={handleChange} onAdd={handleAdd} />

			<ol className=" list-unstyled p-0 m-0">
				{characters.map((item, index) => {
					return (
						<li
							className="border-bottom mb-2 shadow bg-body border-dark d-flex justify-content-between list-unstyled p-2 m-auto w-50"
							key={index}>
							{item.label}

							<button
								className="text-white bg-danger"
								onClick={() => handleDelete(item.label)}
								type="button">
								X
							</button>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
const AddItem = ({ name, onChange, onAdd }) => (
	<div className="">
		<input
			className=" p-1 m-2"
			type="text"
			value={name}
			onChange={onChange}
		/>
		<button className="text-white bg-success" type="button" onClick={onAdd}>
			Add
		</button>
	</div>
);
export default Home;
