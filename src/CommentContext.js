import React from "react";
import {fromJS} from "immutable";
import {updateDictTreeNode} from "./helper";

export const defaultValue = fromJS({
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
  clickId: null
});


export function reducer(state, action) {
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
    case 'initDictTree':
      return state.update('dictTree', () => fromJS(data));
    case 'updateDictTree':
      return state.update('dictTree', (value) => value.push(fromJS(data)));
    case 'recursiveUpdateDictTree':
      return state.update('dictTree', (dictTree) => updateDictTreeNode(dictTree, state.get('reply'), fromJS(data)));
    case 'updateEditorState':
      return state.updateIn(['editorState', action.field], () => data);
    case 'setClickId':
      return state.update('clickId', () => data);
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
  initDictTree: (data) => ({
    type: 'initDictTree',
    data
  }),
  updateDictTree: (data) => ({
    type: 'updateDictTree',
    data
  }),
  recursiveUpdateDictTree: (data) => ({
    type: 'recursiveUpdateDictTree',
    data
  }),
  setClickId: (data) => ({
    type: 'setClickId',
    data
  })
};


const CommentContext = React.createContext({});

export {action};
export default CommentContext;
