import React from "react";
import {fromJS} from "immutable";
import {updateDictTreeNode} from "./helper";

export const defaultValue = fromJS({
  dictTree: [],
  replayId: null,
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
  clickId: null
});


export function reducer(state, action) {
  const {type, data} = action;
  switch (type) {
    case 'closeModal':
      return state.merge({
        modalOpen: false,
        replayId: null
      });
    case 'openModal':
      return state.merge({
        modalOpen: false,
        replayId: data
      });
    case 'initDictTree':
      return state.update('dicTree', () => fromJS(data));
    case 'updateDictTree':
      return state.update('dictTree', (value) => value.push(fromJS(data)));
    case 'recursiveUpdateDictTree':
      return updateDictTreeNode(state.get('dictTree'), state.get('replayId'), data);
    case 'updateEditorState':
      return state.updateIn('editorState', action.field, data);
    default:
      throw new Error();
  }
}


const action = {
  closeModal: () => ({
    type: 'closeModal',
  }),
  updateEditorState: (field, data) => ({
    type: 'updateEditorState',
    field,
    data
  })
};

const generateActions = (names) => {
  names.forEach(name => {
    action[name] = (data) => ({
      type: name,
      data
    });
  });
};

generateActions(['openModal', 'initDictTree', 'updateDictTree', 'recursiveUpdateDictTree']);

export {action};

const CommentContext = React.createContext({});

export default CommentContext;
