import { connect } from "react-redux";
import {
  setItemCsv,
  checkToEmptyDataItemCsv,
  updateDataForChartItemCsv
} from "../action/action";
import Form from "../components/Form";

const mapStateToProps = state => ({
  csvList: state.csvList
});

const mapDispatchToProps = dispatch => ({
  setItemCsv: data => dispatch(setItemCsv(data)),
  checkToEmptyDataItemCsv: async () => {
    try {
      await dispatch(checkToEmptyDataItemCsv());
      return "ok";
    } catch (e) {
      console.log("err ", e);
    }
  },
  updateDataForChartItemCsv: () => dispatch(updateDataForChartItemCsv())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
