import React, {useState, useCallback} from 'react';
import ReactMarkdown from "react-markdown";
import {Box} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import BackupIcon from '@material-ui/icons/Backup';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InfoIcon from '@material-ui/icons/Info';
import Emoji from "./Emoji";
import {getBrowserVersion, getCurrentTime, updateDictTreeNode} from "../helper";
import {v4 as uuidV4} from 'uuid';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import {Context} from "./index";
import {Field} from "./EditorField";
import md5 from 'crypto-js/md5';
import useStyles from './editor.style';


const Editor = React.memo(function Editor(props) {
  const classes = useStyles();
  const {setModalOpen, setDictTree, replayId, handleCloseModal} = props;

  const [state, setState] = useState({
    preview: false,
    emoji: false
  });

  const [editorState, setEditorState] = useState({
    content: '(つ´ω`)つ',
    nickname: 'Anonymous',
    email: '',
    website: '',
    avatar: ''
  });

  const parseData = useCallback(() => {
    const browser = getBrowserVersion();
    const {formatTime, timestamp} = getCurrentTime();
    const website = editorState.website.match('https?://') ? editorState.website : 'http://' + editorState.website;
    return [{
      ...editorState,
      website,
      id: uuidV4(),
      time: timestamp,
      browser: browser,
      child: [],
      avatar: editorState.email ? md5(editorState.email).toString() : ''
    }, formatTime];
  }, [editorState]);

  const handleOnSubmit = useCallback(() => {
    const [data, formatTime] = parseData();
    //TODO: http post
    data.time = formatTime;
    if (replayId === null) {
      setDictTree(dictTree => [
        ...dictTree,
        data
      ]);
    } else {
      setDictTree(dictTree => {
        const tempDictTree = [...dictTree];
        updateDictTreeNode(tempDictTree, replayId, data);
        return tempDictTree;
      });
    }
    setModalOpen(false);
  }, [parseData, replayId, setDictTree, setModalOpen]);

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

  return (
    <Context.Provider value={{editorState, setEditorState}}>
      <Box
        boxShadow={3}
        className={classes.root}
      >
        <div className={classes.editorWrapper}>
          {
            handleCloseModal && (
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
              <div title={'提交'} onClick={handleOnSubmit}>
                <BackupIcon/>
              </div>
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
            <Field
              className={classes.multiLineTextField}
              multiline
              rows={12}
              variant="outlined"
              name={'content'}
            />
          </div>
        </div>
        {
          state.preview && (
            <div style={classes.preview}>
              <ReactMarkdown source={editorState.content}/>
            </div>
          )
        }
        {
          state.emoji && (
            <Emoji setEditorState={setEditorState}/>
          )
        }
      </Box>
    </Context.Provider>
  );
}, (prevProps, nextProps) => {
  return prevProps.replayId === nextProps.replayId;
});

const modalRoot = document.getElementById('modal-root');

export function PortalEditor(props) {
  const classes = useStyles();
  return (
    ReactDOM.createPortal((
        <div className={classes.portal}>
          <Editor {...props}/>
        </div>
      ),
      modalRoot
    )
  );
}

export default Editor;

