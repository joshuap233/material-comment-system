import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  userInfoWrapper: {
    marginTop: 10,
    display: "flex",
    alignItems: 'center'
  },
  userInfo: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > :nth-child(1)': {
      display: 'block',
      marginBottom: 0,
      fontSize: '18px',
    },
    '& > :nth-child(2)': {
      marginTop: 0,
      marginBottom: 0,
      color: '#C4C4C4',
      display: 'flex',
      alignItems: 'center',
      fontSize: '15px',
      '& > span:nth-child(2)': {
        marginLeft: 10,
        marginRight: 10
      }
    }
  },
  replayIcon: {
    color: theme.palette.primary.light
  },
}));
