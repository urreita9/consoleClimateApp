const axios = require('axios');

class Busquedas {
	historial = ['Buenos Aires', 'Madrid', 'New York'];
	constructor() {
		//TODO: Leer db si existe
	}

	get paramsMapBox() {
		return {
			access_token: process.env.MAPBOX_KEY,
			language: 'es',
			limit: '5',
			// types: 'country%2Cregion%2Cdistrict%2Clocality',
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

			console.log(resp.data);

			return []; //retornar ciudades que coincidad con lugar
		} catch (error) {
			return [];
		}
	}
}

module.exports = Busquedas;
