import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^tt[0-9]{7,9}$/.test(param);
};
