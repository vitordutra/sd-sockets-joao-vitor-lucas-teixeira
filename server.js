const net = require('net');
const dotenv = require('dotenv');

dotenv.config();

NUM_PORTA = process.env.PORT || 3333;

let listaDeHamburgeres = [];

// Criar o objeto servidor e registrar a função principal de manipulação da conexão
const server = net.createServer(connectionListener);

server.listen(NUM_PORTA, '0.0.0.0', () => {
  console.log(`Servidor iniciado! Escutando na porta ${NUM_PORTA}`);
});

function connectionListener(socket) {
  socket.on('data', data => {
    const dataString = data.toString().trim();

    const params = dataString.split(' ');

    console.log(params);

    switch (params[0]) {
      case 'CARDAPIO':
        socket.write(
          '[1] SOCKETBURGER - R$ 19,90 \n[2] SOCKETDUPLO - R$ 24,90\n'
        );
        break;

      case 'ADICIONAR':
        listaDeHamburgeres.push({
          id: params[1],
          nome: params[2],
          quantidade: parseInt(params[3]),
          preco: params[2] === 'SOCKETBURGER' ? 19.9 : 24.9,
        });
        socket.write('PEDIDO REGISTRADO');
        break;

      case 'LISTAR':
        let result = '';

        listaDeHamburgeres.forEach(hamburger => {
          result +=
            hamburger.id +
            ' ' +
            hamburger.nome +
            ' ' +
            hamburger.quantidade +
            '\n';
        });

        socket.write(result);
        break;

      case 'REMOVER':
        listaDeHamburgeres = listaDeHamburgeres.filter(
          hamburguer => params[1] !== hamburguer.id
        );
        socket.write('PEDIDO REMOVIDO');
        break;

      case 'TOTAL':
        let precoTotal = listaDeHamburgeres.reduce(
          (prev, curr) =>
            prev.quantidade * prev.preco + curr.quantidade * curr.preco
        );
        console.log(precoTotal);
        socket.write(precoTotal.toString());
        break;

      case 'PAGAR':
        socket.write('Pagamento processado. Bom lanche!');
        break;

      case 'SAIR':
        listaDeHamburgeres = [];
        console.log('Desconectado');
        socket.end();
        break;

      default:
        socket.write('ERRO Comando não reconhecido\n');
    }
  });
}
