import shared from '../shared';

export default async (rule: QbtRSSRule) => {
	const input = `${shared.baseUrl}/rss/setRule`;
	const ruleDef = JSON.stringify(rule.ruleDef);
	const response = await fetch(
		`${input}?ruleName=${rule.ruleName}&ruleDef=${encodeURIComponent(ruleDef)}`,
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
