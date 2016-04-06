
function format(time) {
	return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

export default function run(fn, options) {
	const task = typeof fn === 'undefined' ? fn.default : fn;
	const start = new Date();
	console.log(`[${format(start)}] Starting '${task.name}'...`);
	return task(options).then(() => {
		const end = new Date();
		const time = end.getTime() - start.getTime();
		console.log(`[${format(end)}] Finished '${task.name}' after ${time} ms`);
	});
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
	delete require.cache[__filename];
	const module = require(`./${process.argv[2]}.js`);
	run(module).catch(err => console.error(err.stack));
}
