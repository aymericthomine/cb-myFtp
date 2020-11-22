# cb-myFtp

<strong>FTP client and server.</strong><br/>

Client: myFtpClient.js<br/>
<em>Run: node myFtpServer.js <port></em><br/>
  
Server: myFtpServer.js<br/>
<em>Run: node myFtpClient.js <host> <port></em><br/>
<em>Default host: 127.0.0.1</em><br/>
  

<strong>List of commands:</strong><br/>

• USER <username>: check if the user exist<br/>
• PASS <password>: authenticate the user with a password<br/>
• LIST: list the current directory of the server<br/>
• CWD <directory>: change the current directory of the server<br/>
• RETR <filename>: transfer a copy of the file FILE from the server to the client<br/>
• STOR <filename>: transfer a copy of the file FILE from the client to the server<br/>
• PWD: display the name of the current directory of the server<br/>
• HELP: send helpful information to the client<br/>
• QUIT: close the connection and stop the program<br/>
  
<strong>Other files:</strong><br/>

.author: Name of the author<br/>
db.json: All members information<br/>
HELP.txt: List of all commands<br/>
FILE.txt: Random text<br/>


Craft with ❤️ by Aymeric THOMINE.<br/>
