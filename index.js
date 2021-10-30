require('dotenv').config();
require('colors');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
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
				const lugar = await leerInput('Ciudad: ');
				await busquedas.ciudad(lugar);
				//Buscar lugares

				//Seleccionar lugar

				//Clima lugar

				//Mostrar reultados
				console.log('\nInformacion de la ciudad\n'.green);
				console.log('Ciudad:');
				console.log('Lat:');
				console.log('Lng:');
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
