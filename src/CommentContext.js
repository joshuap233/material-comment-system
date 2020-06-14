import React, {useReducer} from "react";
import {fromJS} from "immutable";
import {updateDictTreeNode} from "./helper";
import {areEqual} from "./helper";

const defaultValue = fromJS({
  dictTree: [],
  reply: null,
  // 编辑器拟态框
  modalOpen: false,
  editorState: {
    content: '(つ´ω`)つ',
    nickname: 'Anonymous',
    email: '',
    website: '',
    avatar: ''
  },
  // 被点击的父级评论id
  clickId: null,
  bottom: false,
  config: {
    codeHighlighting: {
      preview: true,
      quote: false,
      content: true
    }
  }
});


function reducer(state, action) {
  const {type, data} = action;
  switch (type) {
    case 'closeModal':
      return state.merge({
        modalOpen: false,
        reply: null
      });
    case 'openModal':
      return state.merge({
        modalOpen: true,
        reply: data
      });
    case 'mergeDictTree':
      return state.update('dictTree', (value) => value.merge(fromJS(data)));
    case 'recursiveUpdateDictTree':
      return state.update('dictTree', (dictTree) => updateDictTreeNode(dictTree, state.get('reply'), fromJS(data)));
    case 'updateEditorState':
      return state.updateIn(['editorState', action.field], () => data);
    case 'setClickId':
      return state.update('clickId', () => data);
    case 'setBottom':
      return state.update('bottom', () => true);
    default:
      throw new Error();
  }
}


const action = {
  closeModal: () => ({
    type: 'closeModal',
  }),
  openModal: (data) => ({
    type: 'openModal',
    data
  }),
  updateEditorState: (field, data) => ({
    type: 'updateEditorState',
    data,
    field
  }),
  mergeDictTree: (data) => ({
    type: 'mergeDictTree',
    data
  }),
  recursiveUpdateDictTree: (data) => ({
    type: 'recursiveUpdateDictTree',
    data
  }),
  setClickId: (data) => ({
    type: 'setClickId',
    data
  }),
  setBottom: () => ({
    type: 'setBottom',
  })
};


const Provider = React.memo(function Provider(props) {
  const {children, codeHighlighting} = props;

  const [state, dispatch] = useReducer(reducer, defaultValue, (init) => {
    return codeHighlighting ?
      init.updateIn(['config', 'codeHighlighting'], (value) => value.merge(codeHighlighting))
      : init;
  });

  return (
    <CommentContext.Provider value={{state, dispatch, action}}>
      {children}
    </CommentContext.Provider>
  );
}, areEqual);


const CommentContext = React.createContext({});

export {action, Provider};
export default CommentContext;
