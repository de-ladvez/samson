import React, {useState, useEffect} from "react";
import material from "./OutMaterial.scss";
import {connect} from 'react-redux';
import {getMaterialAction} from "../../../action/actionMaterial";
import {getMaterialRequest} from "../../../requests/material";

const OutMaterial = ({getMaterial, material}) => {
    useEffect(() => {
        if(!material.length) {
            getMaterial()
        }
        }, []);

    return (
        <>
            {material.map(item => (<div>
                <div>barcode - {item.barcode}</div>
                <div>name - {item.name}</div>
                <div>description - {item.description}</div>
                <div>weight - {item.weight}</div>
                <div>length - {item.length}</div>
                <div>width - {item.width}</div>
                <div>volume - {item.volume}</div>
                <div>depth - {item.depth}</div>
                <div>nexttestdate - {item.nexttestdate}</div>
                <div>status - {item.status}</div>
                <div>affiliation - {item.affiliation}</div>
                <div>workingstage - {item.workingstage}</div>
                <div>customer - {item.customer}</div>
                <div>manufacturer - {item.manufacturer}</div>
                <div>manufacturerdate - {item.manufacturerdate}</div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
            </div>
            ))}
        </>
    );
};

const mapStateToProps = state => ({
    material: state.material
});

const mapDispatchToProps = dispatch => ({
    getMaterial: () => {
        getMaterialRequest
            .then(res => {
                dispatch(getMaterialAction(res));
            });
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutMaterial);
