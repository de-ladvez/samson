import React, {useState, useEffect} from "react";
import materialStyle from "./OutMaterial.scss";
import {connect} from 'react-redux';
import {getMaterialAction, deleteMaterialAction, addMaterialAction} from "../../../action/actionMaterial";
import {getMaterialRequest, putMaterialRequest, deleteMaterialRequest} from "../../../requests/material";

const OutMaterial = ({getMaterial, deleteMaterial, addMaterial, material}) => {
    useEffect(() => {
        if (!material.length) {
            getMaterial();
        }
    }, []);

    const handleDelete = (id) => {
        deleteMaterial(id);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        const target = e.target;
        const barcode = target.barcode.value || "";
        const name = target.name.value || "";
        const description = target.description.value || "";
        const weight = target.weight.value || 0;
        const length = target.length.value || 0;
        const width = target.width.value || 0;
        const volume = target.volume.value || 0;
        const depth = target.depth.value || 0;
        const nexttestdate = target.nexttestdate.value || "";
        const status = target.status.value || 1;
        const affiliation = target.affiliation.value || "";
        const workingstage = target.workingstage.value || "";
        const customer = target.customer.value || "";
        const manufacturer = target.manufacturer.value || "";
        const manufacturerdate = target.manufacturerdate.value || "";
        if (barcode && name) {
            addMaterial({
                barcode,
                name,
                description,
                weight,
                length,
                width,
                volume,
                depth,
                nexttestdate,
                status,
                affiliation,
                workingstage,
                customer,
                manufacturer,
                manufacturerdate
            });
        }

    };

    return (
        <>
            <form action="" onSubmit={handleAdd}>

                <table className={materialStyle.table}>
                    <thead>
                    <tr>
                        <th>barcode</th>
                        <th>name</th>
                        <th>description</th>
                        <th>weight</th>
                        <th>length</th>
                        <th>width</th>
                        <th>volume</th>
                        <th>depth</th>
                        <th>nexttestdate</th>
                        <th>status</th>
                        <th>affiliation</th>
                        <th>workingstage</th>
                        <th>customer</th>
                        <th>manufacturer</th>
                        <th>manufacturerdate</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {material.map((item, index) => (
                        <tr key={index}>
                            <td>{item.barcode}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.weight}</td>
                            <td>{item.length}</td>
                            <td>{item.width}</td>
                            <td>{item.volume}</td>
                            <td>{item.depth}</td>
                            <td>{item.nexttestdate}</td>
                            <td>{item.status}</td>
                            <td>{item.affiliation}</td>
                            <td>{item.workingstage}</td>
                            <td>{item.customer}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.manufacturerdate}</td>
                            <td>
                                <div onClick={() => {
                                    handleDelete(item._id)
                                }}>-
                                </div>
                            </td>
                        </tr>
                    ))}

                    </tbody>

                    <tfoot>

                    <tr>
                        <td><input type="text" name="barcode" placeholder="barcode"/></td>
                        <td><input type="text" name="name" placeholder="name"/></td>
                        <td><input type="text" name="description" placeholder="description"/></td>
                        <td><input type="text" name="weight" placeholder="weight"/></td>
                        <td><input type="text" name="length" placeholder="length"/></td>
                        <td><input type="text" name="width" placeholder="width"/></td>
                        <td><input type="text" name="volume" placeholder="volume"/></td>
                        <td><input type="text" name="depth" placeholder="depth"/></td>
                        <td><input type="text" name="nexttestdate" placeholder="nexttestdate"/></td>
                        <td><input type="text" name="status" placeholder="status"/></td>
                        <td><input type="text" name="affiliation" placeholder="affiliation"/></td>
                        <td><input type="text" name="workingstage" placeholder="workingstage"/></td>
                        <td><input type="text" name="customer" placeholder="customer"/></td>
                        <td><input type="text" name="manufacturer" placeholder="manufacturer"/></td>
                        <td><input type="text" name="manufacturerdate" placeholder="manufacturerdate"/></td>
                        <td>
                            <button>+</button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </form>
        </>
    );
};

const mapStateToProps = state => ({
    material: state.material
});

const mapDispatchToProps = dispatch => ({
    getMaterial: () => {
        getMaterialRequest()
            .then(res => {
                dispatch(getMaterialAction(res));
            });
    },
    deleteMaterial: (id) => {
        deleteMaterialRequest(id)
            .then((res) => {
                if (!res.deletedCount) return false;
                dispatch(deleteMaterialAction(id));
            })
    },
    addMaterial: (obj) => {
        putMaterialRequest(obj)
            .then((res) => {
                if (!res._id) return false;
                dispatch(addMaterialAction(obj));
            })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OutMaterial);
