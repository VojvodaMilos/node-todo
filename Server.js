const http = require('http');
const db = require('./database.json');
const fs = require('fs');
const port = 5000;
const headers = {
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500"
}

const server = http.createServer((req, res) => {
    res.writeHead("200", headers)
    if (req.url === "/getData") {
        res.end(JSON.stringify(db));
    } else if (req.url === "/changeStatus" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            let data = JSON.parse(body)
            db[data.id].status = data.status;
            fs.writeFileSync("./database.json", JSON.stringify(db))
            res.end(JSON.stringify(db));
        }
        )

    }else if (req.url === "/addTask" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            let data = JSON.parse(body)
            data.id = db.length;
            data.status = false;
            db.push(data)
            fs.writeFileSync("./database.json", JSON.stringify(db))
            res.end(JSON.stringify(db));
        }
        )

    }
    else {
        res.end("No data");
    }

}
);

server.listen(port, () => {
    console.log("Server running on port " + port);
    console.log("http://localhost:" + port);
}
)
