import { connect } from 'react-redux';
// import {
//     setCurrentDataCsv
// } from '../action/action';
import Chart from "../components/chart/index";

const mapStateToProps = state => ({
    csvList: state.csvList
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chart);