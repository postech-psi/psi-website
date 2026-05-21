#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const textExt = new Set([".html", ".md", ".scss", ".css", ".js", ".yml", ".yaml", ".json", ".txt"]);
const sourceDirs = ["_includes", "_layouts", "_sass", "assets", "."];
const pages = ["index.md", "about.md", "projects.md", "team.md", "events.md", "contact.md"];
const mojibake = [
    new RegExp(String.fromCharCode(0x00e2) + "[^\\s<]*", "g"),
    new RegExp(String.fromCharCode(0x00c2), "g"),
    new RegExp(String.fromCharCode(0x00f0) + String.fromCharCode(0x0178), "g"),
    new RegExp(String.fromCharCode(0xfffd), "g"),
];
const failures = [];

function walk(dir, files = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if ([".git", "_site", "node_modules", "vendor"].includes(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, files);
        else files.push(full);
    }
    return files;
}

function read(file) {
    return fs.readFileSync(file, "utf8");
}

function rel(file) {
    return path.relative(root, file).replace(/\\/g, "/");
}

function fail(message) {
    failures.push(message);
}

function assertFile(file) {
    if (!fs.existsSync(path.join(root, file))) fail(`Missing required file: ${file}`);
}

for (const file of pages) assertFile(file);
for (const file of [
    "assets/images/generated/psi-hero-launch.png",
    "assets/images/generated/psi-hero-range-v2.png",
    "assets/images/generated/avionics-lab.png",
    "assets/images/generated/avionics-macro-bay.png",
    "assets/images/generated/propulsion-test.png",
    "assets/images/generated/ground-station-workshop.png",
    "assets/js/main.js",
    "assets/css/main.scss",
]) {
    assertFile(file);
}

const allFiles = walk(root);
const textFiles = allFiles.filter((file) => textExt.has(path.extname(file).toLowerCase()));

for (const file of textFiles) {
    const relative = rel(file);
    if (relative.startsWith("_site/")) continue;
    const content = read(file);

    for (const pattern of mojibake) {
        if (pattern.test(content)) fail(`Possible mojibake in ${relative}`);
        pattern.lastIndex = 0;
    }

    if (relative.startsWith("tools/")) continue;

    const imageRefs = [...content.matchAll(/(?:src|href)=["']([^"']+\.(?:png|jpg|jpeg|webp|svg|gif))["']/gi)];
    for (const match of imageRefs) {
        const ref = match[1];
        if (/^https?:\/\//.test(ref) || ref.includes("{{")) continue;
        const clean = ref.split("#")[0].split("?")[0].replace(/^\//, "");
        if (!fs.existsSync(path.join(root, clean))) fail(`Broken asset reference in ${relative}: ${ref}`);
    }

    const links = [...content.matchAll(/href=["']([^"']+)["']/gi)];
    for (const match of links) {
        const ref = match[1];
        if (/^(https?:|mailto:|#|\{\{)/.test(ref)) continue;
        if (ref.includes("{{")) continue;
        const clean = ref.split("#")[0].replace(/^\//, "");
        const candidates = [
            path.join(root, clean),
            path.join(root, `${clean}.md`),
            path.join(root, clean, "index.md"),
        ];
        if (clean && !candidates.some(fs.existsSync)) fail(`Suspicious internal link in ${relative}: ${ref}`);
    }
}

for (const page of pages) {
    const content = read(path.join(root, page));
    if (!/title_ko:/.test(content) || !/title_en:/.test(content)) fail(`Missing bilingual title front matter: ${page}`);
    if (!/description_ko:/.test(content) || !/description_en:/.test(content)) fail(`Missing bilingual description front matter: ${page}`);
    if (!/i18n-ko/.test(content) || !/i18n-en/.test(content)) fail(`Missing bilingual content markers: ${page}`);
}

const layout = read(path.join(root, "_layouts/default.html"));
if (!/id="main-content"/.test(layout)) fail("Layout is missing #main-content target");
if (!/skip-link/.test(layout)) fail("Layout is missing skip link");
if (!/data-language-toggle/.test(read(path.join(root, "_includes/header.html")))) fail("Header is missing language toggle");
if (!/data-theme-toggle/.test(read(path.join(root, "_includes/header.html")))) fail("Header is missing theme toggle");

for (const page of pages) {
    const content = read(path.join(root, page));
    const imageTags = [...content.matchAll(/<img\b[^>]*>/gi)];
    for (const tag of imageTags) {
        if (!/\salt=/.test(tag[0])) fail(`Image missing alt attribute in ${page}: ${tag[0]}`);
    }
}

if (failures.length) {
    console.error(`Audit failed with ${failures.length} issue(s):`);
    for (const item of failures) console.error(`- ${item}`);
    process.exit(1);
}

console.log("Audit passed: encoding, bilingual markers, metadata, links, and generated assets look consistent.");
