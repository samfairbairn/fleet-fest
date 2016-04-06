import path from 'path';
import fs from './fs';
import { readdirSync, readFile } from 'fs';
import { minify } from 'html-minifier';

async function copy() {

	let _templateBase = await fs.readFile(path.join('../index.html', 'utf-8');

	console.log(_templateBase);

	/*var result = minify('<p title="blah" id="moo">foo</p>', {
		removeAttributeQuotes: true
	});*/

}

export default copy;
