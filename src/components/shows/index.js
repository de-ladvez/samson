import React, { Component } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ReactDOM from "react-dom";
import * as THREE from "three";
class Show extends Component {
    componentDidMount() {
        var renderer = new THREE.WebGLRenderer();
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, 600/500, 0.1, 1000 );
        var controls = new  OrbitControls( camera, renderer.domElement );
        renderer.setSize( 600, 500);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this.mount.appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry( 100, 10, 50 );
        var mat = new THREE.LineBasicMaterial( { color: 0xFFFFFF } );
        var material = new THREE.MeshBasicMaterial( { color: 0x74f25f7a } );
        var borderColor = new THREE.LineSegments(geometry, mat);
        var cube = new THREE.Mesh( geometry, material );

        borderColor.renderOrder = 1;

        scene.add( cube );
        cube.add(borderColor);
        // camera.position.z = 5;
        camera.position.set( 0, 0, 150 );

        var animate = function () {
            requestAnimationFrame( animate );
            controls.update();

            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        animate();

        // animate();
    }
    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        )
    }
}

export default Show;
