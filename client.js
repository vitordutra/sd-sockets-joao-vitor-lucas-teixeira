const net = require('net');

const socket = new net.Socket();

const readline = require('readline');

const delayFunction = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const connectionListener = async () => {
  console.log('Conectado ao servidor!');

  const bufferDelay = 1;

  socket.on('data', data => {
    const dataString = data.toString().trim();
    console.log(dataString);
  });
  await delayFunction(bufferDelay);

  socket.write('CARDAPIO');
  await delayFunction(bufferDelay);

  socket.write('ADICIONAR 1 SOCKETBURGER 2\r\n');
  await delayFunction(bufferDelay);

  socket.write('ADICIONAR 2 SOCKETDUPLO 2\r\n');
  await delayFunction(bufferDelay);

  socket.write('ADICIONAR 3 SOCKETDUPLO 2\r\n');
  await delayFunction(bufferDelay);

  socket.write('LISTAR');
  await delayFunction(bufferDelay);

  socket.write('REMOVER 1\r\n');
  await delayFunction(bufferDelay);

  socket.write('LISTAR');
  await delayFunction(bufferDelay);

  socket.write('TOTAL');
  await delayFunction(bufferDelay);

  socket.write('PAGAR');
  await delayFunction(bufferDelay);

  socket.write('SAIR');
};

socket.connect(8100, '127.0.0.1', connectionListener);
