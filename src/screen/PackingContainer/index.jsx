import React, {useState} from "react";
import style from "./index.scss"
import BarCodeScaner from "../../components/BarCodeScaner/BarCodeScaner";
import {getContainerRequest} from "../../requests/container";
import {getMaterialRequest} from "../../requests/material";
import {
    addContainerForMateriralAction,
    addMaterialInContainerAction,
    clearContainerAction,
    deleteMaterialOutContainerAction,
    getMaterialsInContainerAction
} from "../../action/actionFilingContainer";
import {
    addReservContainerAction
} from "../../action/actionReservContainer";
import Button from "../../components/UI/button/button"
import {connect} from "react-redux";


const OnePart = (props) => {
    const [container, setContainer] = useState({});

    const collbackScan = (res) => {
        getContainerRequest(res).then(result => {
            if (result.length) {

                setContainer({
                    id: result[0]._id,
                    barcode: result[0].barcode,
                    name: result[0].name
                });
            }
        });
    };

    const startCallbeck = (start) => {
        start(collbackScan);
    };

    const handleAgain = () => {
        setContainer({});
    };

    const handleSuccess = () => {
        props.addContainerForMateriral(container);
    };

    return (
        <>
            {!container.name ? (
                <BarCodeScaner
                    classButton={style.button}
                    classVideo={style.video}
                    startAction={startCallbeck}
                    nameButton={"Scaning container"}
                />
            ) : (
                <>
                    <table>
                        <thead>
                        <tr>
                            <th>barcode</th>
                            <th>name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <td>{container.barcode}</td>
                        <td>{container.name}</td>
                        </tbody>
                    </table>
                    <div className={style.buttonsNextPart}>
                        <Button action={handleAgain} title="Clear" class={style.buttonAgain}/>
                        <Button action={handleSuccess} title="Next"/>
                    </div>
                </>
            )}
        </>
    )
};

const TwoPart = (props) => {
    const [material, setMaterial] = useState([]);
    const collbackScan = (res) => {
        getMaterialRequest(res).then(result => {
            if (result.length) {
                const copyResult = [{
                    name: result[0].name,
                    barcode: result[0].barcode,
                    count: 1,
                    id: result[0]._id
                }];
                setMaterial([...material, ...copyResult]);
            }
        });
    };

    const sendMaterials = () => {
        props.addMaterialInContainer(material);
        props.addReservContainer(props.fillingContainers);
    };

    const startCallbeck = (start) => {
        start(collbackScan);
    };

    const handleChangeCountMaterial = (e, index) => {
        const copyMaterrial = [...material];
        copyMaterrial[index]["count"] = e.target.value;
        setMaterial(copyMaterrial);
    };

    const handleDeleteMaterial = (index) => {
        const copyMaterrial = [...material];
        copyMaterrial.splice(index, 1);
        setMaterial(copyMaterrial);
    };
    return (
        <>
            <div>barcode - {props.fillingContainers.barCodeContainer}</div>
            <div>name - {props.fillingContainers.nameContainer}</div>
            {material.map((item, index) => (
                <div key={index}>
                    <div>{item.name}</div>
                    <input type="number" min={1} value={item.count} onChange={(e) => {
                        handleChangeCountMaterial(e, index)
                    }}/>
                    <div onClick={() => {
                        handleDeleteMaterial(index)
                    }}>-
                    </div>
                </div>
            ))}
            <div onClick={sendMaterials}>ok</div>
            <BarCodeScaner startAction={startCallbeck} nameButton={"Start Scan"}/>
        </>
    );
};

const FillingContainerBarCodeScaner = ({
                                           getContainer,
                                           addContainerForMateriral,
                                           fillingContainers,
                                           addMaterialInContainer,
                                           addReservContainer,
                                           reservContainers
                                       }) => {
    return (
        <div>
            {reservContainers.map((item, index) => (
                <div key={index}>
                    <div>{item.barCodeContainer}</div>
                    <div>{item.nameContainer}</div>
                    <div>{item.materials.map((i) => (
                        <>
                            <div>{i.barcode}</div>
                            <div>{i.name}</div>
                            <div>{i.count}</div>
                        </>
                    ))}</div>
                </div>
            ))}
            {!fillingContainers.idContainers ? (
                <OnePart
                    getContainer={getContainer}
                    addContainerForMateriral={addContainerForMateriral}
                />
            ) : (
                <TwoPart
                    fillingContainers={fillingContainers}
                    addMaterialInContainer={addMaterialInContainer}
                    addReservContainer = {addReservContainer}
                />
            )}
        </div>
    )
};

const mapStateToProps = state => ({
    fillingContainers: state.fillingContainers,
    reservContainers: state.reservContainers
});

const mapDispatchToProps = dispatch => ({
    getContainer: async (params) => {
        return await getContainerRequest(params)
    },
    addContainerForMateriral: (param) => {
        dispatch(addContainerForMateriralAction(param))
    },
    addMaterialInContainer: (param) => {
        dispatch(addMaterialInContainerAction(param))
    },
    addReservContainer: (params) => {
        dispatch(addReservContainerAction(params));
        dispatch(clearContainerAction());
    }

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FillingContainerBarCodeScaner);

