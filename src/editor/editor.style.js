import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
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
    borderRadius: 4
  },
  editorWrapper: {
    position: 'relative',
    width: 800
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  editor: {
    position: 'absolute',
    right: 80,
    bottom: 10,
    zIndex: 100,
    '& > div': {
      display: 'flex',
      flexDirection: 'row'
    },
    '& a': {
      color: 'black'
    }
  },
  fieldWrapper: {
    width: 800,
    boxSizing: "border-box",
    border: '1px solid #C4C4C4',
    padding: 5,
    borderRadius: 4,
    '& > :nth-child(1)': {
      boxSizing: "border-box",
      width: '100%',
      display: 'flex',
      padding: '18.5px 14px',
      justifyContent: 'space-between'
    }
  },
  multiLineTextField: {
    width: '100%',
    borderTop: 0
  },
  preview: {
    width: 800,
    border: '1px solid #C4C4C4',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  }
});
