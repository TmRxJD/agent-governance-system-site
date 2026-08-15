export function env(name, fallback = '') {
	return process.env[name] || fallback;
}

export function requireEnv(name) {
	const v = env(name);
	if (!v) throw new Error(`${name} is required`);
	return v;
}
