const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 4000;
const dataDir = path.join(__dirname, "data");
const modelsFile = path.join(dataDir, "properties.json");
const companyFile = path.join(dataDir, "company.json");
const inquiriesFile = path.join(dataDir, "inquiries.json");

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function sendJson(res, status, value) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(value));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/company") {
    sendJson(res, 200, readJson(companyFile, {}));
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/models") {
    sendJson(res, 200, { models: readJson(modelsFile, []) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/inquiries") {
    try {
      const body = JSON.parse(await readBody(req));
      const inquiry = {
        id: Date.now(),
        name: String(body.name || "").trim(),
        email: String(body.email || "").trim(),
        phone: String(body.phone || "").trim(),
        interest: String(body.interest || "").trim(),
        createdAt: new Date().toISOString()
      };

      if (!inquiry.name || !inquiry.email || !inquiry.interest) {
        sendJson(res, 400, { error: "Name, email, and interest are required." });
        return;
      }

      const inquiries = readJson(inquiriesFile, []);
      inquiries.push(inquiry);
      writeJson(inquiriesFile, inquiries);
      sendJson(res, 201, { inquiry });
    } catch (error) {
      sendJson(res, 400, { error: "Invalid inquiry payload." });
    }
    return;
  }

  sendJson(res, 404, { error: "Route not found." });
});

server.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
