import React, {useCallback, useContext, useEffect} from "react";
import Divider from '@material-ui/core/Divider';
import Content from './TreeViewItem';
import CommentContext from "../CommentContext";
import {areEqual} from "../helper";
import {Button} from '@material-ui/core';
import useStyles from './treeView.style';
import Immutable from "immutable";
import PropTypes from 'prop-types';


const TreeNode = React.memo(function Node(props) {
  const {nodes, parent, level} = props;
  if (nodes.size !== 0) {
    return (
      <React.Fragment>
        {
          nodes.map(node => (
            <div key={node.get('id')}>
              <Content
                level={level}
                node={node}
                parent={parent}
              />
              <Divider variant={'middle'}/>
              {
                node.get('child').size !== 0 && (
                  <TreeNode
                    nodes={node.get('child')}
                    parent={{
                      id: node.get('id'),
                      content: node.get('content'),
                      nickname: node.get('nickname')
                    }}
                    level={level + 1}
                  />
                )
              }
            </div>
          ))
        }
      </React.Fragment>
    );
  }
  return <React.Fragment></React.Fragment>;
}, areEqual);

export default React.memo(function TreeView(props) {
    const {initApi, loadMoreAPi} = props;
    const {state, dispatch, action} = useContext(CommentContext);
    useEffect(() => {
      initApi().then(data => {
        dispatch(action.mergeDictTree(data));
      });
    }, [action, dispatch, initApi]);

    const handleOnClick = useCallback(() => {
      loadMoreAPi().then(res => {
        dispatch(action.mergeDictTree(res.data));
        if (res.bottom) {
          dispatch(action.setBottom());
        }
      });
    }, [loadMoreAPi]);
    return (
      <ContextTreeView
        bottom={state.get('bottom')}
        dictTree={state.get('dictTree')}
        handleOnClick={handleOnClick}
      />
    );
  }
);

const ContextTreeView = React.memo(function ContextTreeView(props) {
  const {bottom, dictTree, handleOnClick} = props;
  const classes = useStyles();
  const level = 0;

  return (
    <div className={classes.treeWrapper}>
      <TreeNode
        level={level}
        nodes={dictTree}
      />
      {
        !bottom && (
          <div>
            <div className={classes.loadMoreButton}>
              <Button
                onClick={handleOnClick}
                color="primary" variant={"contained"}>
                加载更多...
              </Button>
            </div>
          </div>
        )
      }
    </div>
  );
});

TreeNode.prototype = {
  nodes: PropTypes.instanceOf(Immutable.List).isRequired,
  parent: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    nickname: PropTypes.string
  }),
  level: PropTypes.number
};


ContextTreeView.prototype = {
  bottom: PropTypes.bool,
  dictTree: PropTypes.instanceOf(Immutable.List),
  handleOnClick: PropTypes.func
};
