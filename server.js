const express = require("express");
const app = express();
const crypto = require("crypto");
const io = require("socket.io");

let validTokens = new Set(); 

const restrictedPages = [
    "/chat.html", "/games.html", "/pomodoro.html", "/cam.html", 
    "/usefulwebsite.html", "/song.html", "/thamkhao.html", "/cavoi.html", 
    "/intro.html", "/topic.html", "/sukienquantrong.html", "/index2.html"
];

app.get("/generate-token", (req, res) => {
    const token = crypto.randomBytes(16).toString("hex"); 
    validTokens.add(token);
    res.json({ success: true, token });
});

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
