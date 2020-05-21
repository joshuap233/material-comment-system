import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
  blockquote: {
    borderLeft: '6px solid #DDDDDD',
    maxHeight: 200,
    overflow: "hidden"
  },
  link: {
    textDecoration: 'none',
    color: '#757575'
  },
  overflow: {
    maxHeight: 100,
    overflow: "hidden"
  },
  loadMore: {
    height: 30,
    background: '#fff',
    opacity: 0.8,
    marginTop: -10,
    display: "flex",
    justifyContent: "center"
  },
  shake: {
    animation: 'shake 1.0s 2',
  }
});
