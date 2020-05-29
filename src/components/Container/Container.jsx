import React, {useState, useEffect} from "react";
import containerStyle from "./Container.scss";
import {connect} from 'react-redux';
import {getContainerAction, addContainerAction, deleteContainerAction} from "../../action/actionContainer";
import {putContainerRequest, getContainerRequest, deleteContainerRequest} from "../../requests/container";

const Container = ({getContainer, deleteContainer, addContainer, containers = []}) => {
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
            <form action="" onSubmit={handleAdd}>

                <table className={containerStyle.table}>
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
                    {containers.map((item, index) => (
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
)(Container);
