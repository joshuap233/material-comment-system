import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
  emojiWrapper: {
    width: 800,
    display: "flex",
    flexWrap: 'wrap',
    border: '1px solid #C4C4C4',
    borderRadius: 4,
    maxHeight: 300
  },
  emoji: {
    padding: 10,
    marginTop: 15,
    cursor: 'pointer',
    marginRight: 20,
    fontSize: '15px'
  }
});
