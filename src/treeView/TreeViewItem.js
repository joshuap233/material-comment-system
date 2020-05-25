import ReactMarkdown from "react-markdown";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import useStyles from './treeViewItem.style';
import Avatar from "@material-ui/core/Avatar";
import CommentContext from "../CommentContext";
import {areEqual} from "../helper";
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CodeBlock from "../CodeBlock";
import './shake.css';

const Content = React.memo(function Content({level, node, parent}) {
  const {state, dispatch, action} = useContext(CommentContext);
  const handleOpenModal = useCallback((reply) => {
    dispatch(action.openModal(reply));
  }, [action, dispatch]);

  const setClickId = useCallback((clickId) => {
    dispatch(action.setClickId(clickId));
  }, [action, dispatch]);

  const handleOnAnimationEnd = useCallback(() => {
    dispatch(action.setClickId(null));

  }, []);
  return (
    <ContextContent
      setClickId={setClickId}
      handleOpenModal={handleOpenModal}
      clickId={state.get('clickId')}
      level={level}
      node={node}
      parent={parent}
      codeHighlighting={state.getIn(['config', 'codeHighlighting'])}
      onAnimationEnd={handleOnAnimationEnd}
    />
  );
}, areEqual);

const ContextContent = React.memo(function ContextContent(props) {
  const {level, node, parent, setClickId, handleOpenModal, clickId, codeHighlighting, handleOnAnimationEnd} = props;
  const classes = useStyles({level, link: node.get('website')});

  const handleOnNicknameClick = (e) => {
    if (!node.get('website')) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={classes.contentWrapper}
      id={node.get('id')}
    >
      <div className={classes.userInfoWrapper}>
        <div>
          <Avatar
            src={`https://www.gravatar.com/avatar/${node.get('avatar')}`}
          />
        </div>
        <div className={classes.userInfo}>
          <a
            href={node.get('website')}
            target={'_blank'}
            rel="noopener noreferrer"
            onClick={handleOnNicknameClick}
            className={`${classes.nickname} shake`}
            onAnimationEnd={handleOnAnimationEnd}
          >
            {node.get('nickname')}
          </a>
          <p>
            <span>
              {node.get('browser')}
            </span>
            <span>
              {node.get('time')}
            </span>
            <span className={classes.replayIcon}>
              <ReplayButton reply={node.get('id')} handleOpenModal={handleOpenModal}/>
            </span>
          </p>
        </div>
      </div>
      {
        parent && <ParentCommentContent
          parent={parent}
          setClickId={setClickId}
          codeHighlighting={codeHighlighting.get('quote')}
        />
      }
      <CommentContent
        content={node.get("content")}
        codeHighlighting={codeHighlighting.get('content')}
      />
    </div>
  );
}, areEqual);


const ParentCommentContent = React.memo(function ParentCommentContent(props) {
  const {codeHighlighting, parent, setClickId} = props;
  const classes = useStyles();
  const handleOnClick = () => {
    setClickId(parent.id);
  };
  return (
    <blockquote className={classes.blockquote}>
      <a
        className={classes.link}
        href={`#${parent.id}`}
        onClick={handleOnClick}>
        <span>
          @{parent.nickname}
        </span>
        <span>:</span>
        <span>
          <ReactMarkdown
            source={parent.content}
            renderers={codeHighlighting ? {
              code: CodeBlock
            } : {}}
          />
        </span>
      </a>
    </blockquote>
  );
}, areEqual);

const CommentContent = React.memo(function CommentContent(props) {
  const {content, codeHighlighting} = props;
  const classes = useStyles();
  const contentRef = useRef();
  const [overflow, setOverflow] = useState(false);
  const [hidden, setHidden] = useState(true);
  const handleOnClick = useCallback(() => {
    setHidden(false);
    setOverflow(false);
  }, []);

  useEffect(() => {
    const current = contentRef.current;
    if (current && hidden) {
      const isOverFlow = current.offsetHeight < current.scrollHeight;
      setOverflow(isOverFlow);
    }
  }, [hidden]);

  return (
    <React.Fragment>
      <div
        ref={contentRef}
        className={`${classes.scroll} ${hidden ? classes.overflow : null}`}
      >
        <ReactMarkdown
          source={content}
          renderers={codeHighlighting ? {
            code: CodeBlock
          } : {}}
        />
      </div>
      {
        overflow && hidden && (
          <div className={classes.loadMore}>
            <Button
              onClick={handleOnClick}
              color="primary"
            >
              查看更多...
            </Button>
          </div>
        )
      }
    </React.Fragment>
  );
});


const ReplayButton = React.memo(function ReplayButton({handleOpenModal, reply}) {
  const handleOnClick = () => {
    handleOpenModal(reply);
  };
  return (
    <ReplyIcon onClick={handleOnClick}/>
  );
});

export default Content;


Content.prototype = {
  level: PropTypes.number,
  node: PropTypes.instanceOf(Immutable.Map),
  parent: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    nickname: PropTypes.string
  })
};

ContextContent.prototype = {
  level: PropTypes.number,
  node: PropTypes.instanceOf(Immutable.Map),
  parent: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    nickname: PropTypes.string
  }),
  setClickId: PropTypes.func,
  handleOpenModal: PropTypes.func,
  clickId: PropTypes.string,
  codeHighlighting: PropTypes.bool,
  handleOnAnimationEnd: PropTypes.func
};

ParentCommentContent.prototype = {
  clickId: PropTypes.string,
  parent: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    nickname: PropTypes.string
  }),
};

CommentContent.prototype = {
  content: PropTypes.string
};


ReplayButton.prototype = {
  handleOpenModal: PropTypes.func,
  reply: PropTypes.string,
};
