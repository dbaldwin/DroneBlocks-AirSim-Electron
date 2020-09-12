var msgpack = require("msgpack-lite");
var net = require('net');


var enableApiControl  = [0, 0, "enableApiControl", [true, ""]];
var armDisarm  = [0, 1, "armDisarm", [false, ""]];
var takeoff  = [0, 2, "takeoff", [10, ""]];

// x, y, z, velocity, timeout_sec, drivetrain, yaw_mode, lookahead, adaptive_lookahead, vehicle_name
// DrivetrainType
// MaxDegreeOfFreedom = 0
// ForwardOnly = 1
var flyForward = [0, 3, "moveToPosition", [0, -5, -25, 5, 60, 0, {"is_rate": true, "yaw_or_rate": 0}, -1, 1, ""]]

var land = [0, 4, "land", [60, ""]];

let commands = [enableApiControl, armDisarm, takeoff, /*flyForward, */land];

let commandIndex = 0;

let commandCount = commands.length;

let currentCommand = commands[0];

var client = new net.Socket();

client.connect(41451, '127.0.0.1', function() {
    send(commands[commandIndex]);
});

client.on('data', function(data) {
	console.log('Received: ' + msgpack.decode(data));

    commandIndex = commandIndex + 1;

    // Send next command

    if (commandIndex < commandCount) {
        send(commands[commandIndex]);
    } else {
        console.log("Mission complete!");
    }
	//client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

function send(command) {
    console.log("sending command: " + command);
    client.write(msgpack.encode(command));
}


// client.request('takeoff', 10, '');


// public request(method: string, ...parameters: any[]) {
//         const [message, callback] = (createMessage(0, method, parameters) as [Message, ResponseListener]);
//         if (callback) {
//             this.send(message, callback);
//         } else {
//             const executor = (resolve: (response: [any, number]) => void, reject: (error: string) => void) => {
//                 const listener = (error: string | null, ...response: any[]) =>
//                     error ? reject(error) : resolve((response as [any, number]));
//                 this.send(message, listener);
//             };
//             return new Promise<[any, number]>(executor);
//         }
//     }


// function createMessage(type: 0 | 2, method: string, parameters: any[]): [Message, SendListener] {
//     const params = parameters.slice(0);
//     const callback: SendListener = popUnless(params, isFunction);
//     const message = (([] as any[]).concat(type, type === 0 ? msgidGenerator.next() : [], method, [params]) as Message);
//     return [message, callback];
// }


// private send(message: Message, responseListener: ResponseListener = () => { }, writeListener: WriteListener = () => { }) {
//         writeMessage(this.socket, message, { codec: this.encodeCodec }).then(() => {
//             debug.enabled && debug(`sent message: ${util.inspect(message, false, null, true)}`);
//             writeListener();
//         }).catch(writeListener);

//         const request = parseMessage(message);
//         if (request.msgid !== undefined) {
//             this.once('data:' + request.msgid, (response: MessageObject) => {
//                 responseListener(response.error || null, response.result, response.msgid || -1);
//             });
//         }
//     }


// function writeMessage(socket: net.Socket, message: Message, option?: msgpack.EncoderOptions) {
//     return new Promise(resolve => socket.write(msgpack.encode(message, option), resolve));
// }