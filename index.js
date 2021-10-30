require('dotenv').config();
require('colors');
const {
	inquirerMenu,
	pausa,
	leerInput,
	listarLugares,
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

// console.log(process.env);

const main = async () => {
	const busquedas = new Busquedas();
	let opt;

	do {
		opt = await inquirerMenu();

		switch (opt) {
			case 1:
				//Mostrar mensaje para input
				const terminoBusqueda = await leerInput('Ciudad: ');
				const lugares = await busquedas.ciudad(terminoBusqueda);

				const idSeleccionado = await listarLugares(lugares);
				const lugarSeleccionado = lugares.find(
					(lugar) => lugar.id === idSeleccionado
				);

				//Buscar lugares

				//Seleccionar lugar

				//Clima lugar

				//Mostrar reultados
				console.log('\nInformacion de la ciudad\n'.green);
				console.log('Ciudad:', lugarSeleccionado.nombre);
				console.log('Lat:', lugarSeleccionado.lat);
				console.log('Lng:', lugarSeleccionado.lng);
				console.log('Temperatura:');
				console.log('Minima:');
				console.log('Maxima:');
				break;

			case 2:
				break;
		}

		if (opt !== 0) await pausa();
	} while (opt !== 0);
};

main();
