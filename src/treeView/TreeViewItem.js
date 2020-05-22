import ReactMarkdown from "react-markdown";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import useStyles from './treeViewItem.style';
import Avatar from "@material-ui/core/Avatar";


export default function Content(props) {
  const {level, node, clickId, handleOpenModal, parent, setClickId} = props;

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
          <Avatar src={node.get('avatar') ? `https://www.gravatar.com/avatar/${node.get('avatar')}` : ''}/>
        </div>
        <div className={classes.userInfo}>
          <Nickname
            website={node.get('website')}
            nickname={node.get('nickname')} clickId={clickId}
            id={node.get('id')}/>
          <p>
            <span>
              {node.get('browser')}
            </span>
            <span>
              {node.get('time')}
            </span>
            <span className={classes.replayIcon}>
              <ReplayButton id={node.get('id')} handleOpenModal={handleOpenModal}/>
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
}


export function ParentCommentContent({parent, setClickId}) {
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
        <span style={{marginLeft: 2}}>@{parent.nickname}</span>
        <span>:</span>
        <span>
          <ReactMarkdown source={parent.content}/>
        </span>
      </a>
    </blockquote>
  );
}

export function CommentContent({content}) {
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
              更多...
            </Button>
          </div>
        )
      }
    </>
  );
}


export function Nickname({website, id, clickId, nickname}) {
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
      className={clickId === id ? classes.shake : null}>
      {nickname}
    </a>
  );
}

export function ReplayButton({handleOpenModal, id}) {
  const handleOnClick = () => {
    handleOpenModal(id);
  };
  return (
    <ReplyIcon onClick={handleOnClick}/>
  );
}
