import { connect } from "react-redux";

import App from "../components/App";

const mapStateToProps = state => ({
    csvList: state.csvList
});

export default connect(
    mapStateToProps,
    {}
)(App);
