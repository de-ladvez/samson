import React, { Component, useEffect } from "react";
// import {useStore} from "react-redux";

import { connect } from 'react-redux'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from "three";


class Show extends Component {
    constructor(props){
        super(props);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, 600/500, 0.1, 1000 );
        const controls = new  OrbitControls( camera, renderer.domElement );
        // const loader = new GLTFLoader();

        const geometry = new THREE.BoxGeometry( 100, 10, 50 );
        const mat = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
        const material = new THREE.MeshBasicMaterial( {color: "aqua", wireframe: true} );
        const borderColor = new THREE.LineSegments(geometry, mat);
        const cube = new THREE.Mesh( geometry, material );

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
            // loader
        };
        this.handlerRange = this.handlerRange.bind(this)
    }
    csvList=()=>{
        return this.props.csvList.csvList[0].data
    };

    barometr=()=>{
        return this.props.csvList.csvList[3].data
    };

    max=()=>{
        return this.csvList().length;
    };

    handlerRange = rn => {
        this.setState({count: rn.target.value});
this.animate();
    };

    countMath = () => {
        let arr = this.csvList();
        let barometr = this.barometr();

        let x = 1.57 * arr[this.state.count].gfx;
        let y = 1.57 * arr[this.state.count].gfy;
        let z = 1.57 * arr[this.state.count].gfz;
        let top =  ((barometr[this.state.count].p - this.state.defaultP)*-1) * 1000;

        return {x,y,z,top};
    };

    animate = () => {
        this.state.controls.update();
        const {x,y,z,top} = this.countMath();
        this.state.cube.rotation.x = x;
        this.state.cube.rotation.z =  y;
        this.state.cube.position.y = 10;
        this.state.renderer.render( this.state.scene, this.state.camera );
    };

    componentDidMount() {
        this.state.renderer.setSize( 600, 500);
        this.mount.appendChild( this.state.renderer.domElement );
        this.state.scene.add(new THREE.GridHelper(600, 10));
        this.state.scene.add( this.state.cube );
        this.state.cube.add(this.state.borderColor);
        this.state.camera.position.set( 0, 80, 160 );
        this.setState({defaultP:  this.barometr()[10].p});

        this.animate();
    }

    render() {
        return (
            <>
                <div ref={ref => (this.mount = ref)} />
                <div >
                    <input type="range" min="0" max={this.max()-1} step="1" onInput={this.handlerRange}/>
                </div>
            </>
                )
    }
}


const mapStateToProps = state => ({
    csvList: state
});


export default connect(mapStateToProps)(Show);
