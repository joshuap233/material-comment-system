import React from 'react';

const emoji = ['(′゜ω。‵)', '(つ´ω`)つ', '(◉３◉)', '(ノ▼Д▼)ノ', '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄', 'w(ﾟДﾟ)w', 'w(ﾟДﾟ)w', '(ノへ￣、)', '(￣_,￣ )', 'ヽ(✿ﾟ▽ﾟ)ノ', '(๑•̀ㅂ•́)و✧', '(￣ε(#￣)☆╰╮o(￣皿￣///)', '（づ￣3￣）づ╭❤～', 'Σ( ° △ °|||)︴', '(～￣(OO)￣)ブ', '凸(艹皿艹 )', '(* ￣3)(ε￣ *)', '(*￣rǒ￣)', '┗|｀O′|┛ 嗷~~', 'φ(≧ω≦*)♪', '︿(￣︶￣)︿', '(u‿ฺu✿ฺ)', 'Hi~ o(*￣▽￣*)ブ', '♪(^∇^*)', 'o(*≧▽≦)ツ┏━┓', '╰(*°▽°*)╯'];

// TODO: 超过最大高度换页
function Emoji({setEditorState}) {
  return (
    <div style={{
      width: 800,
      display: "flex",
      flexWrap: 'wrap',
      border: '1px solid #C4C4C4',
      borderRadius: 4,
      maxHeight: 300
    }}>
      {
        emoji.map((item, index) => (
          <div
            onClick={() => {
              setEditorState(editorState => ({
                ...editorState,
                content: editorState.content + item
              }));
            }}
            key={index}
            style={{
              padding: 10,
              marginTop: 15,
              cursor: 'pointer',
              marginRight: 20
            }}>{item}</div>
        ))
      }
    </div>
  );
}

export default Emoji;
