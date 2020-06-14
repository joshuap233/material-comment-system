import React, {useState, useCallback, useContext, useLayoutEffect} from 'react';
import {Box, TextField} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import {Field, Emoji, ToolBar, Preview} from "./EditorItem";
import useStyles from './editor.style';
import CommentContext from "../CommentContext";
import PropTypes from 'prop-types';


const Editor = React.memo(function Editor(props) {
  const {isModal, submitApi} = props;
  const classes = useStyles();
  const {state:contextState,dispatch, action} = useContext(CommentContext);
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
        <ToolBar
          submitApi={submitApi}
          preview={state.preview}
          handlePreviewClick={handlePreviewClick}
          handleEmojiClick={handleEmojiClick}
          cacheContent={cacheContent}
        />
        <div className={classes.info}>
          <div title={'markdown 语法'}>
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://guides.github.com/features/mastering-markdown/">
              <InfoIcon color="primary"
              />
            </a>
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
      <Preview
        cacheContent={cacheContent}
        show={state.preview}
        codeHighlighting={contextState.getIn(['config','codeHighlighting','preview'])}
      />
      <Emoji setCacheContent={setCacheContent} show={state.emoji}/>
    </Box>
  );
});


const PortalEditor = React.memo(function PortalEditor(props) {
  const {submitApi} = props;
  const classes = useStyles();
  const {state} = useContext(CommentContext);

  const [container] = useState(document.createElement('div'));

  useLayoutEffect(() => {
    document.body.appendChild(container);
    return () => document.body.removeChild(container);
  }, []);

  return (
    <React.Fragment>
      {ReactDOM.createPortal((
          <React.Fragment>
            {
              state.get('modalOpen') && (
                <div className={classes.portal}>
                  <Editor isModal={true} submitApi={submitApi}/>
                </div>
              )
            }
          </React.Fragment>
        ),
        container
      )}
    </React.Fragment>
  );
});


export default React.memo(function MaterialEditor(props) {
  const {submitApi} = props;
  return (
    <React.Fragment>
      <Editor submitApi={submitApi}/>
      <PortalEditor submitApi={submitApi}/>
    </React.Fragment>
  );
});

PortalEditor.prototype = {
  submitApi: PropTypes.func.isRequired,
};

Editor.prototype = {
  isModal: PropTypes.bool.isRequired,
  submitApi: PropTypes.func.isRequired
};
