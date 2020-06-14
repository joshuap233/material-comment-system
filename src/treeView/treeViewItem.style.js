import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  contentWrapper: ({level}) => ({
    marginLeft: level <= 2 ? level * 20 : 3 * 20
  }),
  nickname: ({link}) => link ? {color: '#7986cb'} : {color: '#000'},
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
  blockquote: {
    borderLeft: '6px solid #DDDDDD',
    maxHeight: 150,
    overflow: "hidden"
  },
  link: {
    textDecoration: 'none',
    color: '#757575',
    '& > :nth-child(1)': {
      // color: theme.palette.secondary.light
    }
  },
  overflow: {
    maxHeight: 100,
    overflow: "hidden",
  },
  scroll: {
    overflowX: 'auto'
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
}));
