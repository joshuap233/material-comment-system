import React, {useState, useCallback, useContext} from 'react';
import ReactMarkdown from "react-markdown";
import {Box, TextField} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import BackupIcon from '@material-ui/icons/Backup';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InfoIcon from '@material-ui/icons/Info';
import {getBrowserVersion, getCurrentTime} from "../helper";
import {v4 as uuidV4} from 'uuid';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import {Field, Emoji} from "./EditorItem";
import md5 from 'crypto-js/md5';
import useStyles from './editor.style';
import CommentContext from "../CommentContext";

function SubmitButton({cacheContent}) {
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
    //TODO: http post
    data.time = formatTime;
    if (contextState.get('reply') === null) {
      dispatch(action.updateDictTree(data));
    } else {
      dispatch(action.recursiveUpdateDictTree(data));
    }
    dispatch(action.closeModal());
  }, [action, contextState, dispatch, parseData]);

  return (
    <div title={'提交'} onClick={handleOnSubmit}>
      <BackupIcon/>
    </div>
  );
};

function Preview({cacheContent}) {
  const classes = useStyles();
  return (
    <div className={classes.preview}>
      <ReactMarkdown source={cacheContent}/>
    </div>
  );
}

const Editor = React.memo(function Editor({isModal}) {
  const classes = useStyles();
  const {dispatch, action} = useContext(CommentContext);
  const [cacheContent, setCacheContent] = useState('(つ´ω`)つ');
  const [state, setState] = useState({
    preview: false,
    emoji: false
  });

  const handleContentChange = useCallback((e) => {
    const {value} = e.target;
    setCacheContent(value);
  }, []);

  const handleEmojiClick = useCallback(() => {
    setState(state => ({
      preview: false,
      emoji: !state.emoji
    }));
  }, []);

  const handlePreviewClick = useCallback(() => {
    setState(state => ({
      emoji: false,
      preview: !state.preview
    }));
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch(action.closeModal());
  }, [action, dispatch]);

  return (
    <Box
      boxShadow={3}
      className={classes.root}
    >
      <div className={classes.editorWrapper}>
        {
          isModal && (
            <div className={classes.closeIcon}>
              <CloseIcon onClick={handleCloseModal}/>
            </div>
          )
        }
        <div className={classes.editor}>
          <div>
            <div
              title={state.preview ? '关闭预览' : '预览'}
              onClick={handlePreviewClick}>
              <PageviewIcon/>
            </div>
            <SubmitButton cacheContent={cacheContent}/>
            <div title={'表情'} onClick={handleEmojiClick}>
              <InsertEmoticonIcon/>
            </div>
            <div title={'markdown 语法'}>
              <a
                target={'_blank'}
                rel="noopener noreferrer"
                href="https://guides.github.com/features/mastering-markdown/">
                <InfoIcon/>
              </a>
            </div>
          </div>
        </div>
        <div className={classes.fieldWrapper}>
          <div>
            <Field label="昵称" name={'nickname'}/>
            <Field label="邮箱" name={'email'}/>
            <Field label="网站" name={'website'}/>
          </div>
          <TextField
            className={classes.multiLineTextField}
            multiline
            rows={12}
            variant="outlined"
            name={'content'}
            value={cacheContent}
            onChange={handleContentChange}
          />
        </div>
      </div>
      {
        state.preview && (
          <Preview cacheContent={cacheContent}/>
        )
      }
      {
        state.emoji && (
          <Emoji setCacheContent={setCacheContent}/>
        )
      }
    </Box>
  );
});

const modalRoot = document.getElementById('modal-root');

export const PortalEditor = React.memo(function PortalEditor() {
  const classes = useStyles();
  return (
    ReactDOM.createPortal((
        <div className={classes.portal}>
          <Editor isModal={true}/>
        </div>
      ),
      modalRoot
    )
  );
});

export default Editor;

