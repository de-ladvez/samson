import React, {useEffect, useState} from "react";
// import {connect} from "react-redux";
// import MaskedInput from 'react-maskedinput'
// import axios from "axios";
//
const Table = () => {
//     const [start, setStart] = useState("");
//     const [end, setEnd] = useState("");
//
//     const clearValueInput = (val) => {
//     };
//
    const handlerQuery = () => {
//         // if(start && end) {
//         //     let startCopy  = parseInt(start.replace(/[^\d;]/g, ''));
//         //     let endCopy  = parseInt(end.replace(/[^\d;]/g, ''));
//         let startCopy = 20200423200000;
//         let endCopy = 20200411200000;
//         if (startCopy > endCopy) {
//             addDateStarcome(startCopy, endCopy)
//         }
        // }
//
    };
//
    return (
        <div>
            <div>
                <label htmlFor="">Start</label>

                {/*<MaskedInput mask="1111:11:11 11:11:11" placeholder="YYYY:MM:DD HH:mm:ss"*/}
                             {/*onChange={e => setStart(e.target.value)}/>*/}
            </div>
            <div>
                <label htmlFor="">End</label>
                {/*<MaskedInput mask="1111:11:11 11:11:11" placeholder="YYYY:MM:DD HH:mm:ss"*/}
                             {/*onChange={e => setEnd(e.target.value)}/>*/}
            </div>
            <div onClick={handlerQuery}>Button</div>
        </div>
    );
};
//
// const matchUrl = (query = "get_last_transmits", params = {}) => {
//     let queryParams = "";
//     for (let i in params) {
//         queryParams = queryParams + `&${i}=${params[i]}`;
//     }
//     debugger
//     return `/mongol-api?commandname=${query}&user=devsamson&pass=devsamson01&format=json${queryParams}`;
// };
//
// const mapStateToProps = state => ({});
//
// const mapDispatchToProps = dispatch => ({
//     addDateStarcome: (start, end) => {
//         let data = [];
//         const TWO_WEACKS = 14000000;
//
//         debugger
//         axios({
//             method: "get",
//             url: matchUrl("get_units"),
//         }).then(res => {
//             data = res.data.map(item => {
//                 return {
//                     "unitnumber": item.unitnumber,
//                     active: item.active,
//                     data: {}
//                 }
//             });
//
//             // for(let i in data) {
//                 let localStart = start;
//                 let localEnd = parseInt(start) - TWO_WEACKS;
//                 const getHistory = async () => {
//                     await axios({
//                         url: matchUrl("get_history", {
//                             unitnumber: data[1].unitnumber,
//                             start: localStart,
//                             end: localEnd
//                         })
//                     }).then(res => {
//                         debugger
//                         data[1].data = [...data[1].data, ...res];
//                         if(localEnd < end) {
//                             localEnd = end;
//                         } else {
//                             localStart = parseInt(localStart) - TWO_WEACKS;
//                             getHistory();
//                         }
//                     })
//                 };
//
//                 getHistory();
//             // }
//
//             data.map(item => {
//
//             })
//         })
//     }
// });
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Table)

export default Table;