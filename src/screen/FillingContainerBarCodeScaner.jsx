import React, {useState} from "react";
import BarCodeScaner from "../components/BarCodeScaner/BarCodeScaner";
import {getContainerRequest} from "../requests/container";
import {getMaterialRequest} from "../requests/material";
import {
    addContainerForMateriralAction,
    addMaterialInContainerAction,
    deleteMaterialOutContainerAction,
    getMaterialsInContainerAction
} from "../action/actionFilingContainer";

import {connect} from "react-redux";


const OnePart = (props) => {
    const [container, setContainer] = useState([]);

    const collbackScan = (res) => {
        getContainerRequest(res).then(result => {
            setContainer(result);
        });
    };

    const startCallbeck = (start) => {
        start(collbackScan);
    };

    const handleAgain = () => {
        setContainer([]);
    };

    const handleSuccess = () => {
        props.addContainerForMateriral(container[0]._id);
    };

    return (
        <>
            {!container.length ? (
                <BarCodeScaner startAction={startCallbeck} nameButton={"Start Scan"}/>
            ) : (
                <>
                    <div>{container[0].name}</div>
                    <br/>
                    <div onClick={handleAgain}>Clear</div>
                    <br/>
                    <div onClick={handleSuccess}>ok</div>
                </>
            )}
        </>
    )
};

const TwoPart = (props) => {
    const [material, setMaterial] = useState([]);
    const collbackScan = (res) => {
        getMaterialRequest(res).then(result => {
            debugger
            const copyResult = [{
                name: result[0].name,
                barcode: result[0].barcode,
                count: 1,
                id: result[0]._id
            }];
            setMaterial([...material, ...copyResult]);
        });
    };

    const startCallbeck = (start, stop) => {
        start(collbackScan);
    };
    return (
        <>
            {material.map((item, index) => (
                <>
                    <div>{item.name}</div>
                    <input type="text" onChange={(e) => {setMaterial(material[index]["count"] = e.target.value)}}/>
                </>
            ))}
            <BarCodeScaner startAction={startCallbeck} nameButton={"Start Scan"}/>
        </>
    );
};

const FillingContainerBarCodeScaner = ({getContainer, addContainerForMateriral, fillingContainers}) => {
    return (
        <>
            {!Object.keys(fillingContainers).length ? (
                <OnePart getContainer={getContainer} addContainerForMateriral={addContainerForMateriral}/>
            ) : (
                <TwoPart fillingContainers={fillingContainers} />
            )}
        </>
    )
};

const mapStateToProps = state => ({
    containers: state.containers,
    fillingContainers: state.fillingContainers
});

const mapDispatchToProps = dispatch => ({
    getContainer: async (params) => {
        return await getContainerRequest(params)
    },
    addContainerForMateriral: (param) => {
        dispatch(addContainerForMateriralAction(param))
    }

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FillingContainerBarCodeScaner);

