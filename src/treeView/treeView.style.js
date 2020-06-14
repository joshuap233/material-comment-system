import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  treeWrapper: {
    [theme.breakpoints.only('xs')]: {
      width: '100vw',
      overflowX: 'scroll'
    }
  },
  loadMoreButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  }
}));
