import shared from '../shared';

export default async (category: string, newCategory: string, newSavePath: string) => {
	const input = `${shared.baseUrl}/torrents/editCategory`;
	const response = await fetch(
		`${input}?category=${category}&newCategory=${newCategory}&newSavePath=${newSavePath}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				accept: 'application/json'
			}
		}
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();
	return data;
};
