const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;
const write = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Привет, напишите какой-нибудь цвет\n');
stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    stdout.write('Вы решили выйти через "exit", Всего хорошего, пока!\n');
    exit();
  }
  write.write(chunk);
});
process.on('SIGINT', () => {
  stdout.write('Вы решили выйти через Cntr + C, Всего хорошего, пока!\n');
  exit();
});
