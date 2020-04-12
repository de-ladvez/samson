import React, {Component, useEffect} from "react";
// import {useStore} from "react-redux";

import {connect} from 'react-redux'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import glbmodel from "./3d-obj4.glb";
import * as THREE from "three";


class Show extends Component {
    constructor(props) {
        super(props);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 600 / 500, 0.1, 1000);
        const controls = new OrbitControls(camera, renderer.domElement);
        const loader = new GLTFLoader();

        const geometry = new THREE.BoxGeometry(100, 10, 50);
        const mat = new THREE.LineBasicMaterial({color: 0xFFFFFF});
        const material = new THREE.MeshBasicMaterial({color: "aqua", wireframe: true});
        const borderColor = new THREE.LineSegments(geometry, mat);
        const cube = new THREE.Mesh(geometry, material);

        let loaderModel = new Promise((resolve, reject) => {
            loader.load(glbmodel, (gltf) => {
                resolve(gltf);
            }, undefined, error => {
                console.log(error);
                reject(error);
            });
        });


        this.state = {
            count: 0,
            defaultP: 0,
            renderer,
            scene,
            camera,
            controls,
            geometry,
            mat,
            material,
            borderColor,
            cube,
            loader,
            loaderModel,
            model: undefined
        };
        this.handlerRange = this.handlerRange.bind(this)
    };

    csvList = () => {
        return this.props.csvList.csvList[0].data
    };

    barometr = () => {
        return this.props.csvList.csvList[3].data
    };

    max = () => {
        return this.csvList().length;
    };

    handlerRange = rn => {
        this.setState({count: rn.target.value});
        this.animate();
    };

    // let loadSceneModel = new Promise((resolve, reject) => {
    //     const stacy_mtl = new THREE.MeshPhongMaterial({
    //         emissive: "yellow",
    //     });
    //     let loaderModel = new Promise((resolve, reject) => {
    //
    //     });
    //     await
    //     this.state.loader.load(glbmodel, (gltf) => {
    //         this.setState({model: gltf.scene});
    //         this.state.model.traverse(o => {
    //             if (o.isMesh) {
    //                 o.material = stacy_mtl;
    //             }
    //         });
    //         // this.state.model.scale.set(1000, 1000, 100);
    //         // this.state.model.position.z = -300;
    //         this.state.scene.add(this.state.model);
    //     }, undefined, function (error) {
    //         console.error(error);
    //     });
    // };

    countMath = () => {
        let arr = this.csvList();
        let barometr = this.barometr();

        let x = 1.57 * arr[this.state.count].gfx;
        let y = 1.57 * arr[this.state.count].gfy;
        let z = 1.57 * arr[this.state.count].gfz;
        let p = barometr[this.state.count].p;
        let top = ((this.state.defaultP - p) * 100);
        let dist = 100 / (2 * Math.tan(this.state.camera.fov * Math.PI / 360));

        return {x, y, z, top, dist, p};
    };

    animate = () => {
        this.state.controls.update();
        const {x, y, z, top, dist} = this.countMath();
        this.state.model.rotation.x = x;
        this.state.model.rotation.z = y;
        this.state.model.position.y = top;


        // this.state.cube.rotation.x = x;
        // this.state.cube.rotation.z =  y;
        // this.state.cube.position.y = top;


        this.state.renderer.render(this.state.scene, this.state.camera);
        this.state.camera.position.set(0, 80, 100 + dist);
    };

    componentDidMount() {
        this.state.renderer.setSize(600, 500);
        this.mount.appendChild(this.state.renderer.domElement);
        this.state.scene.add(new THREE.GridHelper(600, 100));

        // this.state.scene.add( this.state.cube );
        // this.state.cube.add(this.state.borderColor);
        this.state.camera.position.set(0, 80, 100);

        // this.setState({defaultP:  0});
        this.setState({defaultP: this.barometr()[10].p});
        // this.state.renderer.render( this.state.scene, this.state.camera );

        const stacy_mtl = new THREE.MeshPhongMaterial({
            emissive: "yellow",
        });
        this.state.loaderModel.then(async res => {
            this.setState({model: res.scene});
            res.scene.traverse(o => {
                if (o.isMesh) {
                    o.material = stacy_mtl;
                }
            });
            await this.state.scene.add(this.state.model);
            this.animate();
        });
        // this.loadSceneModel().then(() => {
        //
        // });
    }

    render() {
        let {x, y, z, top, dist, p} = this.countMath();
        return (
            <>
                <div ref={ref => (this.mount = ref)}/>
                <div>
                    <input type="range" min="0" max={this.max() - 1} step="1" onInput={this.handlerRange}/><br/>
                    {/*<div>x: {x}</div>*/}
                    {/*<div>y: {z}</div>*/}
                    {/*<div>p: {p}</div>*/}
                    <div>meter: ~{(12 * top / 100).toFixed(2)}</div>
                    {/*<div>dist: {dist}</div>*/}
                </div>
            </>
        )
    }
}


const
    mapStateToProps = state => ({
        csvList: state
    });


export default connect(mapStateToProps)

(
    Show
)
;
