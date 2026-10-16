"""Index Nyrix source without importing or executing application modules."""

import json
import re
from collections import Counter
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "revamp"
IMPORT = re.compile(r"^\s*import\s+(?:[^;'\"]*?\s+from\s+)?['\"]([^'\"]+)['\"]\s*;?", re.M)


def resolve_local(source, target):
    base = source.parent / target
    for candidate in (base, Path(str(base) + ".js"), Path(str(base) + ".css"), base / "index.js"):
        if candidate.is_file():
            return candidate.resolve().relative_to(ROOT).as_posix()
    return None


def main():
    files = []
    for source in sorted((ROOT / "src").rglob("*")):
        if not source.is_file():
            continue
        content = source.read_text(encoding="utf-8-sig")
        imports = IMPORT.findall(content) if source.suffix == ".js" else []
        dynamic_imports = re.findall(r"\bimport\(\s*['\"]([^'\"]+)['\"]\s*\)", content) if source.suffix == ".js" else []
        files.append({
            "path": source.relative_to(ROOT).as_posix(),
            "lines": len(content.splitlines()),
            "bytes": source.stat().st_size,
            "imports": imports,
            "dynamic_imports": dynamic_imports,
            "local_dependencies": [resolve_local(source, item) for item in imports + dynamic_imports if item.startswith(".")],
            "section_ids": re.findall(r'<section\b[^>]*\bid=["\']([^"\']+)', content),
            "motion_elements": len(re.findall(r"<motion\.", content)),
        })

    by_path = {item["path"]: item for item in files}
    reachable = set()
    pending = ["src/index.js"]
    while pending:
        current = pending.pop()
        if current in reachable or current not in by_path:
            continue
        reachable.add(current)
        pending.extend(item for item in by_path[current]["local_dependencies"] if item)

    for item in files:
        item["reachable_from_entry_via_static_imports"] = item["path"] in reachable

    app = (ROOT / "src/App.js").read_text(encoding="utf-8")
    routes = []
    for match in re.finditer(r'<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*/>', app):
        routes.append({
            "path": match.group(1),
            "line": app[:match.start()].count("\n") + 1,
            "components": re.findall(r"<([A-Z]\w*)\b", match.group(2)),
        })

    assets = [{"path": item.relative_to(ROOT).as_posix(), "bytes": item.stat().st_size}
              for item in sorted((ROOT / "public").rglob("*")) if item.is_file()]
    agent_text = (ROOT / "src/components/agentsData.js").read_text(encoding="utf-8")
    catalog = {
        "entries": len(re.findall(r"^\s*id:\s*\d+", agent_text, re.M)),
        "categories": dict(Counter(re.findall(r"^\s*category:\s*'([^']+)'", agent_text, re.M))),
    }
    config_names = ["package.json", "package-lock.json", "tailwind.config.js", "postcss.config.js", ".gitignore", "README.md"]
    inventory = {
        "generated_date": date.today().isoformat(),
        "method": "Static filesystem/import inspection; no module execution, runtime crawl, or vector index.",
        "source_file_count": len(files),
        "source_lines": sum(item["lines"] for item in files),
        "routes": routes,
        "agent_catalog": catalog,
        "source_files": files,
        "public_files": assets,
        "root_config_files": [name for name in config_names if (ROOT / name).is_file()],
    }
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / "codebase-index.json").write_text(json.dumps(inventory, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    rows = ["# Generated source inventory", "", f"Generated: {inventory['generated_date']}", "",
            inventory["method"], "",
            f"{len(files)} source files; {inventory['source_lines']} source lines; {len(routes)} routes; {len(assets)} public files.", "",
            "## Route composition", "", "| Route | App.js line | Components |", "| --- | --- | --- |"]
    for route in routes:
        rows.append(f"| `{route['path']}` | {route['line']} | {' → '.join(route['components'])} |")
    rows.extend(["", "Shared shell ownership is defined in App.js; component dependencies include static and literal dynamic imports.", "",
                 "## Source files", "", "| File | Lines | Reachable from entry | Local dependencies |", "| --- | --- | --- | --- |"])
    for item in files:
        deps = ", ".join(f"`{dep}`" if dep else "UNRESOLVED" for dep in item["local_dependencies"]) or "—"
        rows.append(f"| `{item['path']}` | {item['lines']} | {'Yes' if item['reachable_from_entry_via_static_imports'] else 'No'} | {deps} |")
    rows.extend(["", "Reachability follows static imports only. Unreachable files are candidates for review, not automatic deletion.", "",
                 "## Agent catalog", "", f"Entries: {catalog['entries']}", ""])
    rows.extend(f"- {category}: {count}" for category, count in catalog["categories"].items())
    rows.extend(["", "## Public file inventory", "", "Paths and sizes only; archived files are not extracted.", "",
                 "| File | Bytes |", "| --- | --- |"])
    rows.extend(f"| `{item['path']}` | {item['bytes']} |" for item in assets)
    (OUTPUT / "SOURCE_INVENTORY.md").write_text("\n".join(rows) + "\n", encoding="utf-8")
    print(f"Indexed {len(files)} source files, {len(routes)} routes, {len(assets)} public files, and {catalog['entries']} catalog agents.")
    print("Unreachable source files: " + ", ".join(item["path"] for item in files if item["path"] not in reachable))


if __name__ == "__main__":
    main()
