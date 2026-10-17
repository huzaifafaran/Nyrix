// Read-only registry inspection through the real shadcn MCP stdio server.
const { spawn } = require("node:child_process");
const { writeFileSync } = require("node:fs");
const npxPath = process.argv[2];
if (!npxPath) throw new Error("Pass the path to npm's npx-cli.js");
const child = spawn(process.execPath, [npxPath, "--yes", "shadcn@latest", "mcp"], { cwd: process.cwd(), stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
let buffer = "", id = 0, stderr = "";
const pending = new Map();
child.stderr.on("data", data => { stderr = (stderr + data).slice(-2000); });
child.stdout.on("data", data => {
  buffer += data;
  let end;
  while ((end = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, end); buffer = buffer.slice(end + 1);
    try {
      const response = JSON.parse(line);
      if (pending.has(response.id)) {
        const { resolve, reject } = pending.get(response.id); pending.delete(response.id);
        if (response.error) reject(new Error(JSON.stringify(response.error))); else resolve(response.result);
      }
    } catch (error) { if (line.startsWith("{")) process.stderr.write(error.message + "\n"); }
  }
});
function request(method, params) {
  return new Promise((resolve, reject) => {
    const key = ++id; pending.set(key, { resolve, reject });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: key, method, params }) + "\n");
  });
}
const timer = setTimeout(() => { process.stderr.write("MCP timeout: " + stderr); child.kill(); process.exitCode = 1; }, 90000);
(async () => {
  try {
    const server = await request("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "nyrix-registry-review", version: "1.0.0" } });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
    const listing = await request("tools/list", {});
    console.log(JSON.stringify({ server: server.serverInfo, tools: listing.tools.map(tool => tool.name) }));
    const search = listing.tools.find(tool => tool.name === "search_items_in_registries");
    const view = listing.tools.find(tool => tool.name === "view_items_in_registries");
    const results = {};
    if (search) results.search = await request("tools/call", { name: search.name, arguments: { registries: ["@react-bits"], query: "SpotlightCard", limit: 4, offset: 0 } });
    if (view) results.view = await request("tools/call", { name: view.name, arguments: { items: ["@react-bits/SpotlightCard-JS-CSS", "@react-bits/BlurText-JS-CSS"] } });
    writeFileSync("docs/revamp/react-bits-mcp-results.json", JSON.stringify({ server: server.serverInfo, toolNames: listing.tools.map(tool => tool.name), results }, null, 2) + "\n");
    console.log(JSON.stringify({ queried: Object.keys(results), toolErrors: Object.entries(results).filter(([, value]) => value.isError).map(([key]) => key) }));
  } catch (error) { console.error(error.message, stderr); process.exitCode = 1; }
  finally { clearTimeout(timer); child.stdin.end(); child.kill(); }
})();
