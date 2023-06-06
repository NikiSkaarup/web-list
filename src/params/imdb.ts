import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	return /^tt[0-9]{6,9}$/.test(param);
};
