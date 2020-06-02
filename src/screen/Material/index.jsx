import React, {useState, useEffect} from "react";
import style from "./index.scss";
import {connect} from 'react-redux';
import Table from "../../components/UI/table/table"
import {getMaterialAction, deleteMaterialAction, addMaterialAction} from "../../action/actionMaterial";
import {getMaterialRequest, putMaterialRequest, deleteMaterialRequest} from "../../requests/material";

const Index = ({getMaterial, deleteMaterial, addMaterial, material}) => {
    const tableHead= [
        "barcode",
        "name",
        "description",
        "weight",
        "length",
        "width",
        "volume",
        "depth",
        "nexttestdate",
        "status",
        "affiliation",
        "workingstage",
        "customer",
        "manufacturer",
        "manufacturerdate"
    ];

    const tableBodyKeys= [
        "barcode",
        "name",
        "description",
        "weight",
        "length",
        "width",
        "volume",
        "depth",
        "nexttestdate",
        "status",
        "affiliation",
        "workingstage",
        "customer",
        "manufacturer",
        "manufacturerdate"
    ];

    useEffect(() => {
        if (!material.length) {
            getMaterial();
        }
    }, []);

    // const handleDelete = (id) => {
    //     deleteMaterial(id);
    // };
    //
    // const handleAdd = (e) => {
    //     e.preventDefault();
    //     const target = e.target;
    //     const barcode = target.barcode.value || "";
    //     const name = target.name.value || "";
    //     const description = target.description.value || "";
    //     const weight = target.weight.value || 0;
    //     const length = target.length.value || 0;
    //     const width = target.width.value || 0;
    //     const volume = target.volume.value || 0;
    //     const depth = target.depth.value || 0;
    //     const nexttestdate = target.nexttestdate.value || "";
    //     const status = target.status.value || 1;
    //     const affiliation = target.affiliation.value || "";
    //     const workingstage = target.workingstage.value || "";
    //     const customer = target.customer.value || "";
    //     const manufacturer = target.manufacturer.value || "";
    //     const manufacturerdate = target.manufacturerdate.value || "";
    //     if (barcode && name) {
    //         addMaterial({
    //             barcode,
    //             name,
    //             description,
    //             weight,
    //             length,
    //             width,
    //             volume,
    //             depth,
    //             nexttestdate,
    //             status,
    //             affiliation,
    //             workingstage,
    //             customer,
    //             manufacturer,
    //             manufacturerdate
    //         });
    //     }
    //
    // };

    return (
        <>
            <Table body={material} head={tableHead} bodyKeys={tableBodyKeys}/>
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
)(Index);
