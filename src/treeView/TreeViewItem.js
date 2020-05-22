import ReactMarkdown from "react-markdown";
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import useStyles from './treeViewItem.style';
import Avatar from "@material-ui/core/Avatar";
import CommentContext from "../CommentContext";
import {areEqual} from "../helper";

const Content = React.memo(function Content({level, node, parent}) {
  const {state, dispatch, action} = useContext(CommentContext);
  const handleOpenModal = useCallback((reply) => {
    dispatch(action.openModal(reply));
  }, [action, dispatch]);

  const setClickId = useCallback((clickId) => {
    dispatch(action.setClickId(clickId));
  }, [action, dispatch]);

  return (
    <ContextContent
      setClickId={setClickId}
      handleOpenModal={handleOpenModal}
      clickId={state.get('clickId')}
      level={level}
      node={node}
      parent={parent}
    />
  );
}, areEqual);

const ContextContent = React.memo(function ContextContent(props) {
  const {level, node, parent, setClickId, handleOpenModal, clickId} = props;
  const contentWrapper = useMemo(() => ({
    marginLeft: level <= 2 ? level * 20 : 3 * 20
  }), [level]);

  const classes = useStyles(level);

  return (
    <div
      id={node.get('id')}
      style={contentWrapper}
    >
      <div className={classes.userInfoWrapper}>
        <div>
          <Avatar
            src={`https://www.gravatar.com/avatar/${node.get('avatar')}`}
          />
        </div>
        <div className={classes.userInfo}>
          <Nickname
            website={node.get('website')}
            nickname={node.get('nickname')}
            clickId={clickId}
            currentId={node.get('id')}/>
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
        parent && <ParentCommentContent parent={parent} setClickId={setClickId}/>
      }
      <CommentContent content={node.get("content")}/>
    </div>
  );
}, areEqual);


const ParentCommentContent = React.memo(function ParentCommentContent({parent, setClickId}) {
  const classes = useStyles();
  const handleOnClick = () => {
    setClickId(parent.id);
  };
  return (
    <blockquote className={classes.blockquote}>
      <a
        className={classes.link}
        href={`#${parent.id}`}
        onClick={handleOnClick
        }>
        <span>
          @{parent.nickname}
        </span>
        <span>:</span>
        <span>
          <ReactMarkdown source={parent.content}/>
        </span>
      </a>
    </blockquote>
  );
}, areEqual);

const CommentContent = React.memo(function CommentContent({content}) {
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
    <>
      <div
        ref={contentRef}
        className={hidden ? classes.overflow : null}
      >
        <ReactMarkdown source={content}/>
      </div>
      {
        overflow && hidden && (
          <div className={classes.loadMore}>
            <Button
              onClick={handleOnClick}
              color="primary">
              查看更多...
            </Button>
          </div>
        )
      }
    </>
  );
});


const Nickname = React.memo(function Nickname(props) {
  const {website, currentId, clickId, nickname} = props;
  const classes = useStyles();
  const handleOnClick = (e) => {
    if (!website) {
      e.preventDefault();
    }
  };

  const style = website ? {color: '#7986cb'} : {color: '#000'};

  return (
    <a
      href={website}
      target={'_blank'}
      rel="noopener noreferrer"
      onClick={handleOnClick}
      style={style}
      className={clickId === currentId ? classes.shake : null}>
      {nickname}
    </a>
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
