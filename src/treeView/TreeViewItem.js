import ReactMarkdown from "react-markdown";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import ReplyIcon from "@material-ui/icons/Reply";
import useStyles from './treeViewItem.style';

export function ParentContent({parent, setClickId}) {
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

export function Content({content}) {
  const classes = useStyles();
  const contentRef = useRef();
  const [overflow, setOverflow] = useState({
    hidden: true,
    overflow: false
  });
  const handleOnClick = useCallback(() => {
    setOverflow(overflow => ({
      ...overflow,
      hidden: false
    }));
  }, []);

  useEffect(() => {
    // const current = contentRef.current;
    // if (current && overflow.hidden) {
    //   const isOverFlow = current.offsetHeight < current.scrollHeight;
    //   setOverflow(overflow => ({
    //     ...overflow,
    //     overflow: isOverFlow
    //   }));
    // }
  }, [overflow.hidden]);

  return (
    <>
      <div
        ref={contentRef}
        className={overflow.hidden ? classes.overflow : null}
      >
        <ReactMarkdown source={content}/>
      </div>
      {
        overflow.overflow && overflow.hidden && (
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

export function ReplayButton({handleOpenModal, id}) {
  const handleOnClick = () => {
    handleOpenModal(id);
  };
  return (
    <ReplyIcon onClick={handleOnClick}/>
  );
}
