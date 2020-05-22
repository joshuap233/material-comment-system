import React, {useState} from "react";
import Divider from '@material-ui/core/Divider';
import Content from './TreeViewItem';

const TreeNode = React.memo(function Node(props) {
  const {nodes, parent, level, clickId, setClickId, handleOpenModal} = props;

  if (nodes.size !== 0) {
    return (
      <>
        {
          nodes.map(node => (
            <div key={node.get('id')}>
              <Content
                level={level}
                node={node}
                clickId={clickId}
                handleOpenModal={handleOpenModal}
                parent={parent}
                setClickId={setClickId}
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
                    clickId={clickId}
                    setClickId={setClickId}
                    handleOpenModal={handleOpenModal}
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
}, (pre, next) => {
  return pre.nodes === next.nodes &&
    pre.parent.id === next.parent.id &&
    pre.level === next.level;
});

function TreeView({dictTree, handleOpenModal}) {
  const [clickId, setClickId] = useState(null);
  const level = 0;
  return (
    <div>
      <TreeNode
        level={level}
        nodes={dictTree}
        clickId={clickId}
        setClickId={setClickId}
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
}

export default React.memo(TreeView, (prevProps, nextProps) => {
  return prevProps.dictTree === nextProps.dictTree &&
    prevProps.handleOpenModal === nextProps.handleOpenModal;
});
