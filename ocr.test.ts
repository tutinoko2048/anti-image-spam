import { createWorker } from 'tesseract.js';
import { scoreText } from './src/score';

const worker = await createWorker('eng');

const imageName = 'trump.webp';

const image = Buffer.from(await Bun.file(`assets/${imageName}`).arrayBuffer());

const { data } = await worker.recognize(image);

console.log(data.text, scoreText(data.text.toLowerCase()));
