import React, {useEffect, useState, useRef} from "react";
import { useListener } from 'react-bus';
import {connect} from 'react-redux'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import glbmodel from "./3d_model_6m.glb";
import * as THREE from "three";
import show from "./index.scss";

let intervalCont = undefined;
let model = undefined;
let countDbl = 0;
let defaultP = 0;
const renderer = new THREE.WebGLRenderer({antialias: true});
const camera = new THREE.PerspectiveCamera(75, 600 / 500, 0.1, 1000)
const controls = new OrbitControls(camera, renderer.domElement);
const scene = new THREE.Scene();
const loader = new GLTFLoader();
const loaderModel = new Promise((resolve, reject) => {
    loader.load(glbmodel, (gltf) => {
        resolve(gltf);
    }, undefined, error => {
        console.log(error);
        reject(error);
    });
});

const Show = ({csvList}) => {
    const canvas = useRef(null);
    const range = useRef(null);
    let [height, setHeight] = useState(0);
    let [time, setTime] = useState(0);
    let [count, setCount] = useState(0);
    // const [defaultP, setDefaultP] = useState(0);
    // const [matchInterval, setMatchInterval] = useState(undefined);

    const csvListData = () => {
        return csvList[0].data
    };

    const barometr = () => {
        return csvList[3].data
    };

    const max = () => {
        return csvListData().length;
    };

    const handlerChangeCount = (res) => {
        countDbl = res;
        setCount(countDbl);
    };

    const countTime = () => {
        let data = csvListData();
        let dataLength = max();
        let timeFirst = data[0].time.split(":");
        let timeLast = data[dataLength - 1].time.split(":");
        timeFirst =
            timeFirst[0] * 3600000 +
            timeFirst[1] * 60000 +
            timeFirst[2] * 1000 +
            timeFirst[3];
        timeLast =
            timeLast[0] * 3600000 +
            timeLast[1] * 60000 +
            timeLast[2] * 1000 +
            timeLast[3];

        return dataLength / (timeLast - timeFirst);
    };

    const initInterval = () => {
        intervalCont =  setInterval(() => {
            if (max() - 1 > countDbl) {
                setCount(countDbl++);
                return;
            }
            clearInterval(intervalCont);
        }, countTime());
    };


    const play = () => {
        clearInterval(intervalCont);
        initInterval();
    };

    const stop = () => {
        clearInterval(intervalCont);
    };

    const handlerRange = rn => {
        countDbl = parseInt(rn.target.value);
        setCount(countDbl);
    };

    const countMath = () => {
        let arr = csvListData();

        let x = 1.57 * arr[count].gfx;
        let y = 1.57 * arr[count].gfy;
        let z = 1.57 * arr[count].gfz;
        let p = barometr()[count].p;
        let top = ((defaultP - p) * 100);

        setHeight(top);
        setTime(arr[count].time);
        let dist = 160;
        if(camera) {

            dist = 100 / (2 * Math.tan(camera.fov * Math.PI / 360));
        }

        return {x, y, z, top, dist, p};
    };

    const animate = () => {
        controls.update();
        const {x, y, z, top, dist} = countMath();
        // range.current.value = count;
        if(model) {
            model.rotation.x = x;
            model.rotation.z = y;
            model.position.y = top;
        }
        renderer.render(scene, camera);
        camera.position.set(x, 80, 100 + dist);
    };

    useEffect(() => {
            animate();
    }, [count]);

    useEffect(() => {


        renderer.setSize(600, 500);
        canvas.current.appendChild(renderer.domElement);
        scene.add(new THREE.GridHelper(600, 100));
        camera.position.set(0, 80, 100);
        defaultP = barometr()[10].p;
        const stacy_mtl = new THREE.MeshPhongMaterial({
            emissive: "yellow",
        });
        loaderModel.then(res => {
             model = res.scene;

            res.scene.traverse(o => {
                if (o.isMesh) {
                    o.material = stacy_mtl;
                }
            });
             scene.add(res.scene);
            animate();
        });

    }, []) ;

    useListener("handlerChangeCount", handlerChangeCount);

    //
    // let {x, y, z, top, dist, p} = this.countMath();
    return (
        <div>
            <div ref={canvas}></div>
            <div className={show.navigation}>
                <div className={show.play} onClick={play}></div>
                <div className={show.stop} onClick={stop}></div>
                <input className={show.track} ref={range} type="range" min="0" max={max() - 1} step="1"
                       onChange={handlerRange}
                       value={count}/>
                <div>time: {time} </div>
            </div>
            <div>Height: ~{(12 * height / 100).toFixed(2)} m</div>
        </div>
    )
};

const mapStateToProps = state => ({
        csvList: state.csvList,
    });


export default connect(
    mapStateToProps,
    []
)(Show);
