import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  portal: {
    minHeight: 500,
    position: 'fixed',
    zIndex: 101,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
  root: {
    background: '#fff',
    width: 800,
    borderRadius: 4,
    [theme.breakpoints.only('xs')]: {
      width: '100vw'
    }
  },
  editorWrapper: {
    position: 'relative',
    width: '100%'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  info: {
    position: 'absolute',
    left: 20,
    bottom: 15,
    zIndex: 100,

  },
  fieldWrapper: {
    width: '100%',
    boxSizing: "border-box",
    border: '1px solid #C4C4C4',
    padding: 5,
    borderRadius: 4,
    '& > :nth-child(1)': {
      boxSizing: "border-box",
      width: '100%',
      display: 'flex',
      padding: '18.5px 14px',
      justifyContent: 'space-between',
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
        padding: '10px 14px',
      }
    }
  },
  multiLineTextField: {
    width: '100%',
    borderTop: 0
  }
}));
