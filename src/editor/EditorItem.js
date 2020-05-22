import React, {useCallback, useContext} from "react";
import {TextField} from "@material-ui/core";
import CommentContext from "../CommentContext";
import useStyles from './editorItem.style';

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
export function Emoji({setCacheContent}) {
  const classes = useStyles();
  return (
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
  );
}

