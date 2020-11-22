const net = require('net')
const readline = require ('readline')

const client = new net.Socket()

const port = process.argv[3]
const host = process.argv[2]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

client.connect(port, host, () => {
  rl.on('line', (input) => {
    client.write(input)
  });
})

client.on('data', (data) => {
  console.log(data.toString())
})
