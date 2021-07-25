let outputElement = document.getElementById("TempatResult")
let sampleVideoData, sampleImageData
let filesElement = document.querySelector("#files");
// function retrieveSampleVideo() {
function Ambilvideo() {
    let btnupload = document.getElementById("btnupload").files[0];



    var fr = new FileReader();
    fr.onload = function () {

        console.log(fr)
        var data = fr.result;
        sampleVideoData = new Uint8Array(data);
        console.log(sampleVideoData)
    };
    fr.readAsArrayBuffer(btnupload);
}

function teseksekusi() {
    // runCommand("-i input.mp4 -vf showinfo -strict -2 output.mp4")
    runCommand('-i input.mp4 -vf scale=iw/2:ih/2 -strict -2 output.mp4')
}

function retrieveSampleVideo(blob) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", blob, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function (oEvent) {
        var arrayBuffer = oReq.response;
        if (arrayBuffer) {
            sampleVideoData = new Uint8Array(arrayBuffer);
        }
    };

    oReq.send(null);
}

function initWorker() {
    worker = new Worker("worker-asm.js");
    worker.onmessage = function (event) {
        var message = event.data;
        if (message.type == "ready") {
            isWorkerLoaded = true;
            worker.postMessage({
                type: "command",
                arguments: ["-help"]
            });
        } else if (message.type == "stdout") {
            outputElement.textContent += message.data + "\n";
        } else if (message.type == "start") {
            outputElement.textContent = "Worker has received command\n";
        } else if (message.type == "done") {
            // stopRunning();
            var buffers = message.data;
            if (buffers.length) {
                outputElement.className = "closed";
            }
            buffers.forEach(function (file) {
                filesElement.appendChild(getDownloadLink(file.data, file.name));
            });
        }
    };
}

// document.addEventListener("DOMContentLoaded", function () {
initWorker()
// })


function parseArguments(text) {
    text = text.replace(/\s+/g, ' ');
    var args = [];
    // Allow double quotes to not split args.
    text.split('"').forEach(function (t, i) {
        t = t.trim();
        if ((i % 2) === 1) {
            args.push(t);
        } else {
            args = args.concat(t.split(" "));
        }
    });
    return args;

}


function runCommand(text) {
    //if (isReady()) {
    //startRunning();
    var args = parseArguments(text);
    console.log(args);
    worker.postMessage({
        type: "command",
        arguments: args,
        files: [
            {
                "name": "input.jpeg",
                "data": sampleImageData
            },
            {
                "name": "input.mp4",
                "data": sampleVideoData
            }
        ]
    });
    //}
}

function getDownloadLink(fileData, fileName) {
    if (fileName.match(/\.jpeg|\.gif|\.jpg|\.png/)) {
        var blob = new Blob([fileData]);
        var src = window.URL.createObjectURL(blob);
        var img = document.createElement('img');

        img.src = src;
        return img;
    }
    else {
        var a = document.createElement('a');
        a.download = fileName;
        var blob = new Blob([fileData]);
        var src = window.URL.createObjectURL(blob);
        a.href = src;
        a.textContent = 'Click here to download ' + fileName + "!";
        return a;
    }
}
