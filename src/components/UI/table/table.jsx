import React from "react";
import stable from "./table.scss";


export const table = (props) => {
    const Head = () => {
        if (props.head) {
            return (
                <tr>
                    {props.head.map(item => (<th>{item}</th>))}
                </tr>
            );
        }
        return (<></>);
    };

    const Body = () => {
        props.data.map(item => {
            const fields = props.dataFields.reduce((acum, i) => {
                acum.push(<td>{item[i]}</td>);
                return acum;
            }, []);



            return (
                <tr>

                </tr>
            );
        })
    };

    return (
        <table>
            {Head}


            {props.data.map(item => {
            })}

        </table>
    );
};

