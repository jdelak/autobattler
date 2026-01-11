import * as BABYLON from "babylonjs";
import { Client } from "colyseus.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// SCENE
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.15, 0.15, 0.15, 1);

// CAMERA
const camera = new BABYLON.ArcRotateCamera(
  "camera",
  Math.PI / 2,
  Math.PI / 3,
  25,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

// LIGHT
new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(0, 1, 0),
  scene
);

// SOL
BABYLON.MeshBuilder.CreateGround(
  "ground",
  { width: 30, height: 30 },
  scene
);

// COLYSEUS
const client = new Client("ws://localhost:2567");
const meshes = {};
let initialized = false;

client.joinOrCreate("game").then(room => {
  console.log("Connecté :", room.sessionId);

  // 1️⃣ état initial (garanti)
  room.onStateChange.once(state => {
    state.players.forEach((player, id) => {
      createCapsule(player, id);
    });
  });

  // 2️⃣ nouveaux joueurs (garanti)
  room.onMessage("playerJoined", data => {
    if (meshes[data.id]) return;

    createCapsule(data, data.id);
  });

  // 3️⃣ départs
  room.onStateChange(state => {
    state.players.onRemove = (_, id) => {
      meshes[id]?.dispose();
      delete meshes[id];
    };
  });
});


function createCapsule(player, id) {
  console.log("Création capsule", id);

  const material = new BABYLON.StandardMaterial(id + "_mat", scene);
  material.diffuseColor = BABYLON.Color3.FromHexString(player.color);

  const capsule = BABYLON.MeshBuilder.CreateCapsule(
    "capsule_" + id,
    { height: 2, radius: 0.5 },
    scene
  );

  capsule.position.set(player.x, 1, player.z);
  capsule.material = material;

  meshes[id] = capsule;

  player.onChange = () => {
    capsule.position.x = player.x;
    capsule.position.z = player.z;
  };
}

// RENDER LOOP
engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});
