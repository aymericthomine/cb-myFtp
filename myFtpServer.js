const net = require('net')
const fs =  require('fs')
const readline = require('readline');
const { ENGINE_METHOD_DIGESTS, ENETUNREACH } = require('constants');
const { exit } = require('process');

const port = process.argv[2];


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const server = net.createServer((socket) => {
  console.log('>> New connection')
  socket.write('Use the command <HELP> for more information')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ')
    let rawdata = fs.readFileSync('db.json');
    let student = JSON.parse(rawdata);

    switch(directive) {

        case 'USER':
            
            let ACCESS = Boolean
            ACCESS = 0

            student.forEach(element => {
                let verif = element["username"]
                if(verif == parameter){
                     ACCESS = true
                }           
            });  
                if(ACCESS){
                    socket.write(`\nHi `+ parameter + `!\n\nPlease, enter PASS <password> to login`)
                    //fs.writeFileSync('follow.txt',parameter)
                    socket.username = parameter
                }
                else {
                    socket.write('\nUnknown username. Try again!')
                }
            break;

        case 'PASS':
            let result = student.filter(e => e.username == socket.username)
                let ACCESS2 = Boolean
                ACCESS2 = 0
            result.forEach(element2 => {
                let verif2 = element2["password"]
                if(verif2 == parameter){
                    ACCESS2 = true
                    console.log(ACCESS2)
                    }      
                });
                if(ACCESS2){
                    socket.write(`\nYou're successuful login!\n`)
                    socket.write('\nUse the command <HELP> for more information')
                    socket.username = parameter
                    socket.pass = true
                }
                else {
                    socket.write('\nPassword wrong. Try again!')
                }

            break;

        case 'LIST':

        if(socket.pass == true) {
        fs.readdir('/Users/aymeric/code/Myftp',(err,files) => {
        if(err) return console.error(err);
        socket.write('\nFiles of the current directory:\n\n');
        socket.write(files.join('\n'));
        });
        } else {
            socket.write('\nPermission denied. You must be logged in!\n')
            socket.write('\nUse the command <HELP> for more information')
        }

        break;

        case 'CWD':
            if(socket.pass == true) {
                socket.write(`Starting directory: ${process.cwd()}`);
                try {
                    process.chdir(parameter);
                    socket.write(`New directory: ${process.cwd()}`);
                } catch (err) {
                    socket.write(`chdir: ${err}`);
                }
            } else {
                socket.write('\nPermission denied. You must be logged in!\n')
                socket.write('\nUse the command <HELP> for more information')
            }

        break;

        case 'RETR':
            if(socket.pass == true) {
                fs.readFile(`${parameter}`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                    socket.write('\n'+ data)
                })
            } else {
                socket.write('\nPermission denied. You must be logged in!\n')
                socket.write('\nUse the command <HELP> for more information')
            }  

        break;

        case 'STOR':
            if(socket.pass == true) {
                fs.readFile(`${parameter}`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        return;
                    }
                    console.log('\n'+ data)
                })
            } else {
                socket.write('\nPermission denied. You must be logged in!\n')
                socket.write('\nUse the command <HELP> for more information')
            }    

        break;    

        case 'PWD':
            if(socket.pass == true) {
                socket.write(`\nCurrent directory: ${process.cwd()}`)
            } else {
                socket.write('\nPermission denied. You must be logged in!\n')
                socket.write('\nUse the command <HELP> for more information')
            }

        break;

        case 'HELP':
            fs.readFile('HELP.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return;
                }
                socket.write(`\n`+ data)
            })
        break;

        case 'QUIT':
        console.log(`>> Server closed at port ` + port);
        socket.write('\nBye!');
        process.exit(1);

        break;
    }
  })
})

server.listen(port, () => {
  console.log(`>> Server started at port ` + port)
})
