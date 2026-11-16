// Awang 3D: semua bentuk dibina dengan kod (Three.js). Tiada fail model, tiada gambar.
import * as THREE from "./three.module.min.js";

const Q = new URLSearchParams(location.search);
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: Q.has("qc") });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color("#f6e6da");
const cam = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
scene.add(new THREE.HemisphereLight("#fff6ea", "#c9a58e", 1.15));
const sun = new THREE.DirectionalLight("#fff1dd", 2.1); sun.position.set(3.5, 7, 6); sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 5, bottom: -2, near: 1, far: 20 }); sun.shadow.bias = -0.0004; sun.shadow.radius = 5;
scene.add(sun);
const rim = new THREE.DirectionalLight("#ffd0c0", 0.7); rim.position.set(-4, 3, -4); scene.add(rim);
const ground = new THREE.Mesh(new THREE.CircleGeometry(6, 64), new THREE.ShadowMaterial({ opacity: 0.22 }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

/* ---------- tekstur batik & jalur emas (dilukis dengan kod) ---------- */
function batik(base, rx, ry) {
  const c = document.createElement("canvas"); c.width = c.height = 512; const g = c.getContext("2d");
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  function flower(x, y, r, rot) { g.save(); g.translate(x, y); g.rotate(rot);
    g.fillStyle = "#e9b530"; for (let i = 0; i < 6; i++) { g.rotate(Math.PI / 3); g.beginPath(); g.ellipse(0, -r * 0.62, r * 0.3, r * 0.52, 0, 0, 7); g.fill(); }
    g.fillStyle = "#f8dc72"; g.beginPath(); g.arc(0, 0, r * 0.26, 0, 7); g.fill(); g.restore(); }
  function vine(x, y, r, a) { g.strokeStyle = "#d9a428"; g.lineWidth = 4; g.lineCap = "round"; g.beginPath(); g.arc(x, y, r, a, a + 2.2); g.stroke();
    g.fillStyle = "#e9b530"; g.beginPath(); g.ellipse(x + Math.cos(a + 2.2) * r, y + Math.sin(a + 2.2) * r, 9, 5, a, 0, 7); g.fill(); }
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
    const x = i * 128 + (j % 2 ? 64 : 0) + 30, y = j * 128 + 40;
    for (const dx of [0, -512, 512]) for (const dy of [0, -512, 512]) { flower(x + dx, y + dy, 30 + (i + j) % 2 * 8, (i * 3 + j) * 0.5); vine(x + dx + 52, y + dy + 48, 26, (i + j * 2) * 1.1); }
  }
  for (let i = 0; i < 70; i++) { g.fillStyle = "#e2ad2a"; g.beginPath(); g.arc(rnd() * 512, rnd() * 512, 2.5, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx || 1, ry || 1); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}
function trimTex(rx) {
  const c = document.createElement("canvas"); c.width = 256; c.height = 64; const g = c.getContext("2d");
  g.fillStyle = "#e3ae2c"; g.fillRect(0, 0, 256, 64); g.fillStyle = "#f7d968"; g.fillRect(0, 0, 256, 9); g.fillRect(0, 55, 256, 9);
  g.strokeStyle = "#a8701a"; g.lineWidth = 4; g.beginPath(); for (let x = 0; x <= 256; x += 32) { g.moveTo(x, 50); g.lineTo(x + 16, 14); g.lineTo(x + 32, 50); } g.stroke();
  g.fillStyle = "#8e1838"; for (let x = 16; x < 256; x += 32) { g.beginPath(); g.arc(x, 40, 4, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.repeat.set(rx || 8, 1); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const std = (o) => new THREE.MeshStandardMaterial(Object.assign({ roughness: 0.8 }, o));
const M = {
  skin: std({ color: "#f8c7a0", roughness: 0.6, emissive: "#3a1a0c" }), skin2: std({ color: "#eeae86", roughness: 0.6, emissive: "#3a1a0c" }),
  hair: std({ color: "#17120f", roughness: 0.5 }), white: std({ color: "#ffffff", roughness: 0.3, emissive: "#b9b9b9" }),
  iris: std({ color: "#8a4a16", roughness: 0.3 }), black: std({ color: "#120d0b", roughness: 0.4 }),
  mouth: std({ color: "#7c1f25" }), tongue: std({ color: "#ee7f86" }), blush: new THREE.MeshBasicMaterial({ color: "#f08f7a", transparent: true, opacity: 0.35 }),
  batik: std({ map: batik("#93193b", 3, 1.5) }), batikHat: std({ map: batik("#8d1737", 4, 1) }), batikS: std({ map: batik("#93193b", 1, 1), side: THREE.DoubleSide }),
  batikSkirt: std({ map: batik("#93193b", 5, 1), side: THREE.DoubleSide }),
  maroon: std({ color: "#8d1737" }), pants: std({ color: "#7d1c45", roughness: 0.9 }),
  gold: std({ color: "#e8b62f", metalness: 0.55, roughness: 0.35 }), trim: std({ map: trimTex(10), metalness: 0.25, roughness: 0.5, side: THREE.DoubleSide }),
  leather: std({ color: "#4b2a1b", roughness: 0.55 }), leather2: std({ color: "#3a1f14", roughness: 0.6 }),
};
const mesh = (geo, mat, p, parent) => { const m = new THREE.Mesh(geo, mat); if (p) m.position.set(p[0], p[1], p[2]); m.castShadow = true; m.receiveShadow = true; if (parent) parent.add(m); return m; };
const grp = (p, parent) => { const g = new THREE.Group(); if (p) g.position.set(p[0], p[1], p[2]); if (parent) parent.add(g); return g; };
const sph = (r, w, h) => new THREE.SphereGeometry(r, w || 32, h || 24);

/* ---------- binaan badan ---------- */
const root = grp([0, 0, 0], scene);
const hips = grp([0, 1.34, 0], root);
const torso = grp([0, 0.05, 0], hips);
// baju
const body = mesh(new THREE.CapsuleGeometry(0.47, 0.3, 8, 32), M.batik, [0, 0.42, 0], torso); body.scale.set(1.06, 1, 0.82);
const skirt = mesh(new THREE.CylinderGeometry(0.5, 0.95, 0.52, 48, 1, true), M.batikSkirt, [0, -0.12, 0], torso); skirt.scale.z = 0.86;
const hem = mesh(new THREE.CylinderGeometry(0.925, 0.97, 0.1, 48, 1, true), M.trim, [0, -0.36, 0], torso); hem.scale.z = 0.86;
// kepak hadapan berbucu + selempang tengah
function flap(sign) { const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(0.5, 0); s.lineTo(0.42, -0.42); s.lineTo(0.08, -0.72); s.lineTo(0, 0);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.03, bevelEnabled: false });
  const uv = geo.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1.6, uv.getY(i) * 1.6);
  const g = grp([sign * 0.03, 0.1, 0.47], torso); g.rotation.set(-0.66, sign * 0.42, 0); g.scale.x = sign;
  const edge = mesh(geo, M.trim, [0, 0, 0], g); edge.scale.set(1.12, 1.1, 1); edge.position.set(-0.02, 0.02, -0.02);
  mesh(geo, M.batikS, [0.03, -0.03, 0.012], g).scale.set(0.9, 0.88, 1); }
flap(1); flap(-1);
const sash = grp([0, 0.08, 0.5], torso); sash.rotation.x = -0.6;
mesh(new THREE.BoxGeometry(0.2, 0.78, 0.035), M.batikS, [0, -0.4, 0], sash); mesh(new THREE.BoxGeometry(0.23, 0.1, 0.045), M.trim, [0, -0.78, 0], sash);
// tali pinggang + kepala tali pinggang
const belt = mesh(new THREE.CylinderGeometry(0.51, 0.52, 0.15, 40), M.leather, [0, 0.16, 0], torso); belt.scale.z = 0.84;
const bk = grp([0, 0.16, 0.44], torso);
mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.06, 28), M.gold, [0, 0, 0], bk).rotation.x = Math.PI / 2;
mesh(new THREE.TorusGeometry(0.1, 0.022, 10, 28), M.gold, [0, 0, 0.035], bk); mesh(sph(0.05), M.gold, [0, 0, 0.04], bk);
// kolar + butang emas
const collar = mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.14, 24, 1, true), std({ color: "#8d1737", side: THREE.DoubleSide }), [0, 0.86, 0], torso);
mesh(new THREE.TorusGeometry(0.2, 0.018, 8, 24), M.gold, [0, 0.93, 0], torso).rotation.x = Math.PI / 2;
mesh(new THREE.BoxGeometry(0.09, 0.42, 0.03), M.trim, [0, 0.55, 0.395], torso).rotation.x = -0.05;
for (let i = 0; i < 3; i++) mesh(new THREE.BoxGeometry(0.2, 0.03, 0.03), M.gold, [0, 0.68 - i * 0.11, 0.41], torso);
mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.16, 20), M.skin2, [0, 0.93, 0], torso);

/* ---------- kepala ---------- */
const head = grp([0, 1.62, 0.02], torso); head.scale.setScalar(1.22);
const R = 0.6;
const skull = mesh(sph(R, 48, 36), M.skin, [0, 0, 0], head); skull.scale.set(1.03, 0.97, 0.96);
function onFace(obj, yaw, pitch, r) { const d = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
  obj.position.copy(d.clone().multiplyScalar(r || R * 0.955)); obj.lookAt(d.multiplyScalar(5)); head.add(obj); return obj; }
for (const s of [-1, 1]) {
  const ear = mesh(sph(0.15, 20, 16), M.skin, [s * 0.59, -0.06, -0.02], head); ear.scale.set(0.5, 1, 0.8);
  mesh(sph(0.08, 16, 12), M.skin2, [s * 0.62, -0.07, 0.02], head).scale.set(0.4, 0.9, 0.6);
  const eye = onFace(new THREE.Group(), s * 0.4, -0.02, R * 0.94); eye.scale.setScalar(1.2);
  mesh(sph(0.15, 28, 20), M.white, [0, 0, 0], eye).scale.set(0.92, 1.08, 0.16);
  mesh(sph(0.115, 24, 18), M.iris, [s * -0.012, -0.005, 0.03], eye).scale.set(1, 1.05, 0.25);
  mesh(sph(0.066, 20, 14), M.black, [s * -0.012, -0.005, 0.052], eye).scale.set(1, 1.05, 0.2);
  mesh(sph(0.032, 12, 10), M.white, [0.035, 0.05, 0.064], eye).scale.z = 0.3; mesh(sph(0.016, 10, 8), M.white, [-0.04, -0.045, 0.064], eye).scale.z = 0.3;
  const lid = mesh(new THREE.TorusGeometry(0.15, 0.02, 8, 20, Math.PI * 0.8), M.black, [0, 0.02, 0.02], eye); lid.rotation.z = Math.PI * 0.1; lid.scale.set(0.95, 1.05, 0.4);
  const brow = onFace(new THREE.Group(), s * 0.4, 0.36, R * 0.985); const b = mesh(new THREE.CapsuleGeometry(0.036, 0.19, 6, 12), M.black, [0, 0, 0], brow); b.rotation.z = Math.PI / 2 + s * 0.3; b.scale.z = 0.5;
  const bl = onFace(new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), M.blush), s * 0.62, -0.36, R * 0.99); bl.scale.set(1.2, 0.75, 1);
}
onFace(mesh(sph(0.055, 16, 12), M.skin2), 0, -0.2, R * 0.975).scale.set(1.1, 0.8, 0.8);
// mulut senyum terbuka (boleh buka tutup)
const mouthAnchor = onFace(new THREE.Group(), 0.0, -0.5, R * 0.975); mouthAnchor.scale.setScalar(1.15);
const mouth = grp([0, 0.06, 0], mouthAnchor);
{ const s = new THREE.Shape(); s.moveTo(-0.17, 0); s.quadraticCurveTo(0, -0.03, 0.17, 0); s.quadraticCurveTo(0.15, -0.2, 0, -0.21); s.quadraticCurveTo(-0.15, -0.2, -0.17, 0);
  mesh(new THREE.ShapeGeometry(s, 24), M.mouth, [0, 0, 0.012], mouth);
  const t = new THREE.Shape(); t.moveTo(-0.145, -0.012); t.quadraticCurveTo(0, -0.04, 0.145, -0.012); t.lineTo(0.125, -0.065); t.quadraticCurveTo(0, -0.085, -0.125, -0.065); t.lineTo(-0.145, -0.012);
  mesh(new THREE.ShapeGeometry(t, 16), M.white, [0, 0, 0.02], mouth);
  const tg = mesh(new THREE.CircleGeometry(0.075, 20), M.tongue, [0, -0.15, 0.018], mouth); tg.scale.set(1.15, 0.6, 1);
  mouth.children.forEach((m) => { m.castShadow = false; }); }
// rambut hitam + jambul
const hairCap = mesh(new THREE.SphereGeometry(R * 1.05, 40, 24, 0, Math.PI * 2, 0, 1.72), M.hair, [0, 0.0, -0.03], head); hairCap.rotation.x = -0.5; hairCap.scale.set(1, 0.98, 0.98);
[[-0.36, 0.36, 0.5, 0.5], [-0.2, 0.42, 0.33, 0.56], [-0.03, 0.44, 0.18, 0.6], [0.14, 0.43, -0.2, 0.56], [0.31, 0.38, -0.5, 0.5], [0.45, 0.28, -0.8, 0.42]].forEach(([x, y, rz, len]) => {
  const g = onFace(new THREE.Group(), x * 1.5, y * 1.2 + 0.08, R * 1.0); const c = mesh(new THREE.ConeGeometry(0.13, len * 0.62, 10), M.hair, [0, -0.06, 0], g); c.rotation.z = Math.PI + rz; c.scale.z = 0.35; });
for (const s of [-1, 1]) { const g = onFace(new THREE.Group(), s * 1.18, -0.02, R * 0.99); const c = mesh(new THREE.ConeGeometry(0.1, 0.34, 8), M.hair, [0, 0, 0], g); c.rotation.z = Math.PI; c.scale.z = 0.4; }
// tengkolok
const hat = grp([0, 0.4, -0.03], head); hat.rotation.set(-0.16, 0, 0.05);
mesh(new THREE.CylinderGeometry(0.635, 0.655, 0.3, 48, 1, true), M.batikHat, [0, 0.02, 0], hat);
const tr1 = mesh(new THREE.CylinderGeometry(0.66, 0.665, 0.06, 48, 1, true), M.trim, [0, -0.12, 0], hat), tr2 = mesh(new THREE.CylinderGeometry(0.64, 0.645, 0.05, 48, 1, true), M.trim, [0, 0.16, 0], hat);
mesh(sph(0.63, 40, 24), M.batikHat, [0, 0.14, 0], hat).scale.set(1, 0.62, 1);
const fold1 = mesh(sph(0.42, 24, 18), M.maroon, [-0.3, 0.34, 0.02], hat); fold1.scale.set(0.85, 0.5, 0.9); fold1.rotation.z = 0.35;
function peak(geoPts, p, rot, mat) { const s = new THREE.Shape(); s.moveTo(geoPts[0][0], geoPts[0][1]); geoPts.slice(1).forEach((q) => s.lineTo(q[0], q[1]));
  const m = mesh(new THREE.ExtrudeGeometry(s, { depth: 0.16, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 }), mat, p, hat); m.rotation.set(rot[0], rot[1], rot[2]); return m; }
peak([[-0.42, 0], [0.36, 0], [0.3, 0.42], [0.1, 0.74], [-0.2, 0.36]], [0.16, 0.2, 0.06], [-0.12, -0.25, -0.12], M.batikHat);
peak([[-0.3, 0], [0.3, 0], [0.18, 0.4], [-0.14, 0.3]], [0.02, 0.22, 0.2], [-0.2, 0.1, 0.1], M.maroon);
const bro = grp([0.05, 0.03, 0.66], hat);
mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.05, 24), M.gold, [0, 0, 0], bro).rotation.x = Math.PI / 2;
for (let i = 0; i < 8; i++) mesh(sph(0.045, 12, 10), M.gold, [Math.cos(i * Math.PI / 4) * 0.12, Math.sin(i * Math.PI / 4) * 0.12, 0.02], bro);
mesh(sph(0.06, 14, 12), M.gold, [0, 0, 0.04], bro);

/* ---------- tangan ---------- */
function arm(s) {
  const sh = grp([s * 0.5, 0.74, 0], torso), up = grp([0, 0, 0], sh);
  const sl = mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.4, 24), M.batik, [0, -0.17, 0], up); mesh(sph(0.21, 24, 16), M.batik, [0, 0.0, 0], up);
  mesh(new THREE.CylinderGeometry(0.255, 0.262, 0.08, 24, 1, true), M.trim, [0, -0.35, 0], up);
  mesh(new THREE.CapsuleGeometry(0.135, 0.2, 6, 16), M.skin, [0, -0.38, 0], up);
  const el = grp([0, -0.52, 0], up);
  mesh(new THREE.CapsuleGeometry(0.125, 0.26, 6, 16), M.skin, [0, -0.2, 0], el);
  mesh(new THREE.CylinderGeometry(0.155, 0.165, 0.2, 24), M.leather, [0, -0.3, 0], el);
  for (let i = 0; i < 6; i++) mesh(sph(0.018, 8, 6), M.gold, [Math.cos(i * 1.05) * 0.16, -0.3, Math.sin(i * 1.05) * 0.16], el);
  const hand = grp([0, -0.5, 0], el); const f = mesh(sph(0.17, 24, 18), M.skin, [0, 0, 0], hand); f.scale.set(1, 0.92, 1.05);
  for (let i = 0; i < 4; i++) mesh(sph(0.055, 12, 10), M.skin2, [(-0.09 + i * 0.06), -0.08, 0.12], hand).scale.set(1, 1, 0.8);
  const th = grp([s * -0.13, -0.02, 0.08], hand); mesh(new THREE.CapsuleGeometry(0.05, 0.1, 4, 10), M.skin, [0, 0, 0], th).rotation.z = 0.2;
  return { sh, el, hand, th };
}
const AR = arm(-1), AL = arm(1);      // AR = tangan kanan Awang (kiri skrin)

/* ---------- kaki ---------- */
function leg(s) {
  const hip = grp([s * 0.27, 0, 0], hips);
  const th = mesh(sph(0.4, 28, 20), M.pants, [0, -0.36, 0], hip); th.scale.set(0.98, 1.22, 1.02);
  const kn = grp([0, -0.72, 0], hip);
  mesh(new THREE.TorusGeometry(0.2, 0.07, 10, 24), M.pants, [0, -0.06, 0], kn).rotation.x = Math.PI / 2;
  mesh(new THREE.CapsuleGeometry(0.135, 0.22, 6, 16), M.skin, [0, -0.3, 0], kn);
  const ft = grp([0, -0.52, 0], kn);
  const foot = mesh(sph(0.17, 20, 16), M.skin, [0, -0.01, 0.13], ft); foot.scale.set(0.95, 0.5, 1.55);
  for (let i = 0; i < 5; i++) mesh(sph(0.04 - i * 0.004, 10, 8), M.skin, [s * (-0.09 + i * 0.045), -0.03, 0.39 - i * 0.012], ft);
  const sole = mesh(new THREE.BoxGeometry(0.34, 0.07, 0.62), M.leather2, [0, -0.115, 0.12], ft);
  for (const z of [0.28, 0.08]) { const st = mesh(new THREE.TorusGeometry(0.17, 0.035, 8, 20, Math.PI), M.leather, [0, -0.08, z], ft); st.scale.set(1, 0.72, 1.6); }
  mesh(new THREE.TorusGeometry(0.15, 0.035, 8, 20), M.leather, [0, 0.08, -0.03], ft).rotation.x = Math.PI / 2;
  return { hip, kn, ft };
}
const LR = leg(-1), LL = leg(1);

/* ---------- gaya (pose) & animasi ---------- */
const J = { hipsY: hips.position, tor: torso.rotation, head: head.rotation, ars: AR.sh.rotation, are: AR.el.rotation, als: AL.sh.rotation, ale: AL.el.rotation,
  lrh: LR.hip.rotation, lrk: LR.kn.rotation, lrf: LR.ft.rotation, llh: LL.hip.rotation, llk: LL.kn.rotation, llf: LL.ft.rotation, art: AR.th.rotation };
const P = {
  silat: { y: 1.16, tor: [0.05, 0.12, 0], head: [0, -0.08, 0.03], ars: [-1.05, 0, -0.45], are: [-1.75, 0, 0.5], als: [0.1, 0, 0.75], ale: [-0.45, 0, 0], art: [0, 0, 0],
    lrh: [-0.35, 0.25, -0.72], lrk: [0.5, 0, 0.72], lrf: [-0.15, -0.3, 0], llh: [-0.3, -0.2, 0.7], llk: [0.45, 0, -0.7], llf: [-0.15, 0.3, 0] },
  diri: { y: 1.3, tor: [0, 0, 0], head: [0, 0, 0], ars: [0, 0, -0.2], are: [-0.15, 0, 0], als: [0, 0, 0.2], ale: [-0.15, 0, 0], art: [0, 0, 0],
    lrh: [0, 0.1, -0.1], lrk: [0, 0, 0.1], lrf: [0, -0.15, 0], llh: [0, -0.1, 0.1], llk: [0, 0, -0.1], llf: [0, 0.15, 0] },
};
P.lambai = Object.assign({}, P.diri, { als: [0, 0, 2.5], ale: [0, 0, 0.5], head: [0, 0, 0.1] });
P.bagus = Object.assign({}, P.diri, { ars: [-1.25, 0, -0.25], are: [-0.9, 0, 0.3], art: [0, 0, -1.9], head: [0, -0.1, -0.08] });
P.lompat = P.diri; P.jalan = P.diri; P.cakap = P.diri;
let act = Q.get("a") || "silat", t0 = 0, spin = false, talk = false, yaw = Q.has("yaw") ? +Q.get("yaw") : -0.25;
const cur = {}; const keys = ["tor", "head", "ars", "are", "als", "ale", "lrh", "lrk", "lrf", "llh", "llk", "llf", "art"];
keys.forEach((k) => (cur[k] = (P[act] || P.silat)[k].slice())); let curY = (P[act] || P.silat).y;
function frame(now) {
  const t = now / 1000, dt = t - t0, tgt = P[act] || P.silat, k = 0.14;
  keys.forEach((n) => { for (let i = 0; i < 3; i++) cur[n][i] += (tgt[n][i] - cur[n][i]) * k; J[n].set(cur[n][0], cur[n][1], cur[n][2]); });
  curY += (tgt.y - curY) * k; let y = curY + Math.sin(t * 2.2) * 0.012;
  torso.scale.y = 1 + Math.sin(t * 2.2) * 0.008; head.rotation.z += Math.sin(t * 1.3) * 0.02;
  if (act === "lambai") { AL.el.rotation.z += Math.sin(dt * 9) * 0.45; head.rotation.z += 0.05; }
  if (act === "lompat") { const p = (dt % 1.1) / 1.1, h = Math.max(0, Math.sin(p * Math.PI)); y += h * 0.45 - (p < 0.12 ? 0.1 * Math.sin(p / 0.12 * Math.PI) : 0);
    AR.sh.rotation.z -= h * 2.3; AL.sh.rotation.z += h * 2.3; LR.hip.rotation.x -= h * 0.7; LL.hip.rotation.x -= h * 0.7; LR.kn.rotation.x += h * 1.2; LL.kn.rotation.x += h * 1.2; }
  if (act === "jalan") { const s = Math.sin(dt * 7); LR.hip.rotation.x += s * 0.6; LL.hip.rotation.x -= s * 0.6; LR.kn.rotation.x += Math.max(0, -s) * 0.8; LL.kn.rotation.x += Math.max(0, s) * 0.8;
    AR.sh.rotation.x -= s * 0.6; AL.sh.rotation.x += s * 0.6; y += Math.abs(Math.cos(dt * 7)) * 0.05; }
  if (act === "bagus") { AR.sh.rotation.x += Math.sin(dt * 6) * 0.06; }
  AR.th.scale.setScalar(act === "bagus" ? 1.7 : 1); AR.th.position.y = act === "bagus" ? 0.1 : -0.02;
  hips.position.y = y;
  mouth.scale.y = talk ? 0.25 + Math.abs(Math.sin(t * 9) * Math.sin(t * 3.1)) * 0.95 : 1;
  if (spin) yaw += 0.012; root.rotation.y = yaw;
  renderer.render(scene, cam); requestAnimationFrame(frame);
}
function fit() { const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); cam.aspect = w / h;
  const d = w / h < 0.8 ? 12.6 : 8.9; cam.position.set(0, 2.2, d); cam.lookAt(0, 1.72, 0); cam.updateProjectionMatrix(); }
addEventListener("resize", fit); fit();
let drag = null; const cv = renderer.domElement;
cv.addEventListener("pointerdown", (e) => { drag = e.clientX; cv.setPointerCapture(e.pointerId); });
cv.addEventListener("pointermove", (e) => { if (drag !== null) { yaw += (e.clientX - drag) * 0.01; drag = e.clientX; } });
cv.addEventListener("pointerup", () => (drag = null));
document.querySelectorAll("button").forEach((b) => (b.onclick = () => { const a = b.dataset.a;
  if (a === "pusing") { spin = !spin; b.classList.toggle("on", spin); return; }
  if (a === "cakap") { talk = !talk; b.classList.toggle("on", talk); return; }
  act = a; t0 = performance.now() / 1000; document.querySelectorAll("button").forEach((x) => { if (!["pusing", "cakap"].includes(x.dataset.a)) x.classList.toggle("on", x === b); }); }));
if (Q.has("qc")) document.getElementById("bar").style.display = "none";
requestAnimationFrame(frame);
