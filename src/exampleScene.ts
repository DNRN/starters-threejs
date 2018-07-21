import { PerspectiveCamera, Scene, WebGLRenderer, SpotLight, Mesh } from "three";
import * as THREE from 'three';

export class ExampleScene {

    private _scene: Scene = new THREE.Scene();
    private _renderer: WebGLRenderer = new THREE.WebGLRenderer();
    private _camera: PerspectiveCamera;

    public Meshes = {
        plane: (): Mesh => {
            const planeGeometry = new THREE.PlaneGeometry(60, 20);
            const planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
            return new THREE.Mesh(planeGeometry, planeMaterial);
        },
        cube: (): Mesh => {
            const cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
            const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
            const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cubeMesh.castShadow = true;
            return cubeMesh;
        },
        sphere: (): Mesh => {
            const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
            const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
            const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphereMesh.castShadow = true;
            return sphereMesh;
        }
    };

    public Light = {
        spotlight: (x: number, y: number, z: number): SpotLight => {
            const spotlight = new THREE.SpotLight(0xffffff);
            spotlight.position.set(x, y, z);
            spotlight.castShadow = true;
            return spotlight;
        }
    }
    
    constructor(width: number, height: number) {
        console.log('init three.js');
        this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this._renderer.setClearColor(new THREE.Color(0xEEEEEE));
        this._renderer.setSize(width, height);
        this._renderer.shadowMapEnabled = true;

        this.setupScene();
    }

    public init() {
        const elm = document.getElementById('webgl');
        if (!elm) return;
        elm.appendChild(this._renderer.domElement);
        this._renderer.render(this._scene, this._camera);
    }

    private setupScene() {
        const axis = new THREE.AxesHelper(20);
        this._scene.add(axis);

        // Setup camera
        this._camera.position.x = -30;
        this._camera.position.y = 40;
        this._camera.position.z = 30;
        this._camera.lookAt(this._scene.position);

        // add plane mesh
        let plane = this.Meshes.plane();
        plane.rotation.x = -0.5*Math.PI;
        plane.rotation.y = 0;
        plane.rotation.z = 0;
        this._scene.add(plane);

        // add cube
        this._scene.add(this.Meshes.cube());

        // add spehere
        this._scene.add(this.Meshes.sphere());

        // add spot light
        this._scene.add(this.Light.spotlight(-40, 60, -10));
    }    
}
