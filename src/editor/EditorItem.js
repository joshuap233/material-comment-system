import React, {useCallback, useContext, useMemo} from "react";
import {TextField, Collapse} from "@material-ui/core";
import CommentContext from "../CommentContext";
import useStyles from './editorItem.style';
import {getBrowserVersion, getCurrentTime, cln} from "../helper";
import {v4 as uuidV4} from "uuid";
import md5 from "crypto-js/md5";
import ReactMarkdown from "react-markdown";
import PageviewIcon from "@material-ui/icons/Pageview";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import EditIcon from "@material-ui/icons/Edit";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PublishIcon from '@material-ui/icons/Publish';
import PropTypes from "prop-types";
import CodeBlock from '../CodeBlock';
import useEditorStyle from '../editorState.style';


export const Field = React.memo(function Field({name, ...props}) {
  const {state, dispatch, action} = useContext(CommentContext);
  const fieldValue = state.getIn(['editorState', name]);
  const handleOnChange = useCallback((e) => {
    const {value} = e.target;
    dispatch(action.updateEditorState(name, value));
  }, [action, dispatch, name]);

  return (
    <ContextField handleOnChange={handleOnChange} fieldValue={fieldValue} {...props}/>
  );
});

const ContextField = React.memo(function ContextField(props) {
  const {fieldValue, handleOnChange, ...otherProps} = props;
  return (
    <TextField
      {...otherProps}
      value={fieldValue}
      onChange={handleOnChange}
    />
  );
});

const emoji = ['(′゜ω。‵)', '(つ´ω`)つ', '(◉３◉)', '(ノ▼Д▼)ノ', '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄', 'w(ﾟДﾟ)w', 'w(ﾟДﾟ)w', '(ノへ￣、)', '(￣_,￣ )', 'ヽ(✿ﾟ▽ﾟ)ノ', '(๑•̀ㅂ•́)و✧', '(￣ε(#￣)☆╰╮o(￣皿￣///)', '（づ￣3￣）づ╭❤～', 'Σ( ° △ °|||)︴', '(～￣(OO)￣)ブ', '凸(艹皿艹 )', '(* ￣3)(ε￣ *)', '(*￣rǒ￣)', '┗|｀O′|┛ 嗷~~', 'φ(≧ω≦*)♪', '︿(￣︶￣)︿', '(u‿ฺu✿ฺ)', 'Hi~ o(*￣▽￣*)ブ', '♪(^∇^*)', 'o(*≧▽≦)ツ┏━┓', '╰(*°▽°*)╯'];

// TODO: 超过最大高度换页
export const Emoji = React.memo(function Emoji({setCacheContent, show}) {
  const classes = useStyles();
  return (
    <Collapse in={show}>
      <div className={classes.emojiWrapper}>
        {
          emoji.map((item, index) => (
            <div
              onClick={() => {
                setCacheContent(cacheContent => cacheContent + item);
              }}
              key={index}
              className={classes.emoji}>
              {item}
            </div>
          ))
        }
      </div>
    </Collapse>
  );
});


export const SubmitButton = React.memo(function SubmitButton({cacheContent, submitApi}) {
  const {state: contextState, dispatch, action} = useContext(CommentContext);

  const parseData = useCallback(() => {
    const browser = getBrowserVersion();
    const {formatTime, timestamp} = getCurrentTime();
    const editorState = contextState.get('editorState').toJS();
    editorState.content = cacheContent;
    let website = editorState.website;
    if (website && !website.match('https?://')) {
      website = 'http://' + website;
    }
    return [{
      ...editorState,
      website,
      id: uuidV4(),
      time: timestamp,
      browser: browser,
      child: [],
      avatar: editorState.email ? md5(editorState.email).toString() : ''
    }, formatTime];
  }, [cacheContent, contextState]);

  const handleOnSubmit = useCallback(() => {
    let [data, formatTime] = parseData();
    const tempData = {...data, child: []};
    submitApi(tempData);
    data.time = formatTime;
    if (contextState.get('reply') === null) {
      dispatch(action.mergeDictTree([data]));
    } else {
      dispatch(action.recursiveUpdateDictTree(data));
    }
    dispatch(action.closeModal());
  }, [action, contextState, dispatch, parseData, submitApi]);

  return (
    <PublishIcon color="primary" onClick={handleOnSubmit}/>
  );
});


export const Preview = React.memo(function Preview(props) {
  const {cacheContent, show, codeHighlighting} = props;
  const classes = useStyles();
  const editorStyle = useEditorStyle();
  return (
    <Collapse in={show}>
      {
        show && (
          <div className={cln(classes.preview,editorStyle.table)}>
            <ReactMarkdown
              renderers={
                codeHighlighting ? {code: CodeBlock} : {}
              }
              source={cacheContent}
            />
          </div>
        )
      }
    </Collapse>
  );
});

export const ToolBar = React.memo(function ToolBar(props) {
  const {handlePreviewClick, preview, handleEmojiClick, cacheContent, submitApi} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const actions = useMemo(() => [
    {icon: <PageviewIcon color="primary"/>, name: preview ? '关闭预览' : '预览', handleOnClick: handlePreviewClick},
    {icon: <InsertEmoticonIcon color="primary"/>, name: '标签', handleOnClick: handleEmojiClick},
    {icon: <SubmitButton color="primary" cacheContent={cacheContent} submitApi={submitApi}/>, name: '提交'},
  ], [cacheContent, handleEmojiClick, handlePreviewClick, preview, submitApi]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const speedDialClass = useMemo(() => ({
    fab: classes.speedDialFab
  }), [classes.speedDialFab]);

  const speedDialActionStyle = useMemo(() => ({
    fab: classes.speedDialAction
  }), [classes.speedDialAction]);

  return (
    <SpeedDial
      ariaLabel="tool bar"
      className={classes.speedDial}
      icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      classes={speedDialClass}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          classes={speedDialActionStyle}
          tooltipTitle={action.name}
          onClick={action.handleOnClick}
          title={action.name}
        />
      ))}
    </SpeedDial>
  );
});

Field.prototype = {
  name: PropTypes.string
};

ContextField.prototype = {
  fieldValue: PropTypes.string,
  handleOnChange: PropTypes.func
};

Emoji.prototype = {
  setCacheContent: PropTypes.func,
  show: PropTypes.bool
};

SubmitButton.prototype = {
  cacheContent: PropTypes.string,
  submitApi: PropTypes.func
};

Preview.prototype = {
  cacheContent: PropTypes.string,
  show: PropTypes.bool,
  codeHighlighting: PropTypes.bool
};

ToolBar.prototype = {
  handlePreviewClick: PropTypes.func,
  preview: PropTypes.bool,
  handleEmojiClick: PropTypes.func,
  cacheContent: PropTypes.string,
  submitApi: PropTypes.func
};
