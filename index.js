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

				//Buscar lugares
				const lugares = await busquedas.ciudad(terminoBusqueda);
				//Seleccionar lugar
				const idSeleccionado = await listarLugares(lugares);

				if (idSeleccionado === '0') continue;

				const lugarSeleccionado = lugares.find(
					(lugar) => lugar.id === idSeleccionado
				);

				//agregart Lugar en Db
				busquedas.agregarHistorial(lugarSeleccionado.nombre);

				//Clima Lugar
				const clima = await busquedas.climaLugar(
					lugarSeleccionado.lat,
					lugarSeleccionado.lng
				);
				//Mostrar reultados
				console.log('\nInformacion de la ciudad\n'.green);
				console.log('Ciudad:', lugarSeleccionado.nombre.magenta);
				console.log('Lat:', lugarSeleccionado.lat);
				console.log('Lng:', lugarSeleccionado.lng);
				console.log('Temperatura:', clima.temp);
				console.log('Minima:', clima.min);
				console.log('Maxima:', clima.max);
				console.log('Como esta el clima:', clima.desc.green);
				console.log();
				break;

			case 2:
				busquedas.historialCapitalizado.forEach((lugar, i) => {
					const idx = `${i + 1}.`.green;
					console.log(`${idx} ${lugar}`);
				});
				console.log();
				break;
		}

		if (opt !== 0) await pausa();
	} while (opt !== 0);
};

main();
