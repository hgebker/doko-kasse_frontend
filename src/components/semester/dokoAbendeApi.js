import axios from 'axios';

const ENDPOINT_URL = 'https://ohrdm8vwf2.execute-api.eu-central-1.amazonaws.com/default/doko-abende';

const REQUEST_CONFIG = {
	baseURL: ENDPOINT_URL
};

const getEntries = async () => {
	try {
		const response = await axios.get(ENDPOINT_URL, REQUEST_CONFIG);

		if (response.status === 401) {
			throw new Error('Der Login ist fehlgeschlagen!');
		} else if (response.status === 403) {
			throw new Error('Der Zugriff wurde vom Server verweigert!');
		} else if (response.status !== 200) {
			throw new Error('Ein Fehler ist aufgetreten!');
		}

		return response.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export { getEntries };
