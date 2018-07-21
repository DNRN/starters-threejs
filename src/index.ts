import { ExampleScene } from "./exampleScene";

window.onload = () => {
    const exampleScene = new ExampleScene(window.innerWidth, window.innerHeight);
    exampleScene.init();
};