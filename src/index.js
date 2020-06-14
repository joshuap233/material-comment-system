import Comments from "./treeView/TreeView";
import Editor from "./editor/Editor";
import {Provider} from './CommentContext';
import PropTypes from "prop-types";
import './global.css';
import React from "react";


Provider.prototype = {
  codeHighlighting: PropTypes.shape({
    preview: PropTypes.bool,
    quote: PropTypes.bool,
    content: PropTypes.bool
  })
};

Comments.prototype = {
  initApi: PropTypes.func.isRequired,
  loadMoreAPi: PropTypes.func.isRequired
};


Editor.prototype = {
  submitApi: PropTypes.func.isRequired,
};

export {
  Comments, Editor, Provider
};
