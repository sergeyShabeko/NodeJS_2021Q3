import { Transform } from 'stream';

const reverseString = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().split('').reverse().join('').replace(/\n/gm, '') + '\n\n');
    callback();
  }
});

process.stdin.pipe(reverseString).pipe(process.stdout);