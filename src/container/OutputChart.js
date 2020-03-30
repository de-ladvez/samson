import { connect } from 'react-redux';
// import {
//     setItemCsv
// } from '../action/action';
import Chart from "../components/chart/index";

const mapStateToProps = state => ({
    csvList: state.csvList
});

export default connect(
    mapStateToProps,
    {}
)(Chart);