const fs = require('fs');
const axios = require('axios');

class Busquedas {
	historial = [];
	dbPath = './db/database.json';
	constructor() {
		this.leerDB();
	}

	get historialCapitalizado() {
		return this.historial.map((lugar) => {
			let palabras = lugar.split(' ');
			palabras = palabras.map((palabra) => {
				return palabra[0].toUpperCase() + palabra.substring(1);
			});
			return palabras.join(' ');
		});
	}
	get paramsMapBox() {
		return {
			access_token: process.env.MAPBOX_KEY,
			language: 'es',
			limit: '5',
			types: 'country,region,district,place',
		};
	}
	get paramsOpenWeather() {
		return {
			appid: process.env.OPENWEATHER_KEY,
			lang: 'es',
			units: 'metric',
		};
	}
	async ciudad(lugar = '') {
		try {
			//peticion HTTP
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
				params: this.paramsMapBox,
			});

			const resp = await instance.get();

			return resp.data.features.map((lugar) => ({
				id: lugar.id,
				nombre: lugar.place_name,
				lng: lugar.center[0],
				lat: lugar.center[1],
			}));

			//retornar ciudades que coincidad con lugar
		} catch (error) {
			return [];
		}
	}

	async climaLugar(lat, lon) {
		try {
			const instance = axios.create({
				baseURL: 'https://api.openweathermap.org/data/2.5/weather',
				params: { ...this.paramsOpenWeather, lat, lon },
			});

			const resp = await instance.get();
			const { main, weather } = resp.data;

			return {
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp,
				desc: weather[0].description,
			};
		} catch (error) {
			console.log(error);
		}
	}
	agregarHistorial(lugar = '') {
		// Prevenir duplicados
		if (this.historial.includes(lugar.toLowerCase())) {
			return;
		}
		this.historial = this.historial.splice(0, 5);

		this.historial.unshift(lugar.toLowerCase());

		//Grabar en Db
		this.guardarDB();
	}
	guardarDB() {
		const payload = {
			historial: this.historial,
		};

		fs.writeFileSync(this.dbPath, JSON.stringify(payload));
	}
	leerDB() {
		if (!fs.existsSync(this.dbPath)) return;

		const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
		const data = JSON.parse(info);

		this.historial = data.historial;
	}
}

module.exports = Busquedas;
