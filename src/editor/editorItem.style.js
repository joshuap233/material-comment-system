import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  emojiWrapper: {
    width: '100%',
    display: "flex",
    flexWrap: 'wrap',
    border: '1px solid #C4C4C4',
    borderRadius: 4,
    maxHeight: 300,
    overflowY: "auto"

  },
  emoji: {
    padding: 10,
    marginTop: 15,
    cursor: 'pointer',
    marginRight: 20,
    fontSize: '15px',
  },
  preview: {
    width: '100%',
    border: '1px solid #C4C4C4',
    borderRadius: 4,
    padding: 5,
    wordBreak: 'break-word',
    boxSizing: "border-box"
  },
  speedDial: {
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
  speedDialFab: {
    height: 30,
    width: 30,
    minHeight: 0,
  },
  speedDialAction: {
    height: 30,
    width: 30,
    minHeight: 0
  }
}));
