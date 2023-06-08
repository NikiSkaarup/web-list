import shared from '../shared';

export default {
	single: async (id: number) => {
		const input = `${shared.baseUrl}/search/status`;
		const response = await fetch(`${input}?id=${id}`, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data: QbtSearchStatusItem = await response.json();
		return data;
	},
	all: async () => {
		const input = `${shared.baseUrl}/search/status`;
		const response = await fetch(`${input}`, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data: Array<QbtSearchStatusItem> = await response.json();
		return data;
	}
};
