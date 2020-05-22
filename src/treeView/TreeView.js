import React, {useContext} from "react";
import Divider from '@material-ui/core/Divider';
import Content from './TreeViewItem';
import CommentContext from "../CommentContext";
import {areEqual} from "../helper";
import {Button} from '@material-ui/core';


const TreeNode = React.memo(function Node(props) {
  const {nodes, parent, level} = props;
  if (nodes.size !== 0) {
    return (
      <>
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
      </>
    );
  }
  return <></>;
}, areEqual);

function TreeView() {
  const {state} = useContext(CommentContext);
  return (
    <ContextTreeView dictTree={state.get('dictTree')}/>
  );
}

const ContextTreeView = React.memo(function ContextTreeView({dictTree}) {
  const level = 0;
  return (
    <div>
      <TreeNode
        level={level}
        nodes={dictTree}
      />
      <div>
        <Button variant="contained" color="primary">
          加载更多...
        </Button>
      </div>
    </div>
  );
});

export default React.memo(TreeView);
