import React, {useState, useEffect} from "react";
import style from "./index.scss";
import Table from "../../components/UI/table/table";
import {connect} from 'react-redux';
import {getContainerAction, addContainerAction, deleteContainerAction} from "../../action/actionContainer";
import {putContainerRequest, getContainerRequest, deleteContainerRequest} from "../../requests/container";

const Index = ({getContainer, deleteContainer, addContainer, containers = []}) => {
    const tableHead = [
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

    const tableBodyKeys = [
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
        if (!containers.length) {
            getContainer();
        }
    }, []);

    const handleDelete = (id) => {
        deleteContainer(id);
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
            addContainer({
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
            <Table head={tableHead} body={containers} bodyKeys={tableBodyKeys}/>
        </>
    );
};

const mapStateToProps = state => ({
    containers: state.containers
});

const mapDispatchToProps = dispatch => ({
    getContainer: () => {
        getContainerRequest()
            .then(res => {
                dispatch(getContainerAction(res));
            });
    },
    deleteContainer: (id) => {
        deleteContainerRequest(id)
            .then((res) => {
                if (!res.deletedCount) return false;
                dispatch(deleteContainerAction(id));
            })
    },
    addContainer: (obj) => {
        putContainerRequest(obj)
            .then((res) => {
                if (!res._id) return false;
                dispatch(addContainerAction(obj));
            })
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
