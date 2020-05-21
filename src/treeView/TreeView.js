import React, {useMemo, useState} from "react";
import {Content, ParentContent, ReplayButton, Nickname} from './TreeViewItem';
import useStyles from './treeView.style';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

function TreeView({dictTree, handleOpenModal}) {
  const [clickId, setClickId] = useState(null);
  const level = 0;
  const classes = useStyles({level});

  function TreeNode(props) {
    const {nodes, parent, level} = props;

    const contentWrapper = useMemo(() => ({
      marginLeft: level <= 3 ? level * 20 : 0
    }), [level]);

    if (nodes.size !== 0) {
      return (
        <>
          {
            nodes.map(node => (
              <div key={node.id}>
                <div
                  id={node.id}
                  style={contentWrapper}
                >
                  <div className={classes.userInfoWrapper}>
                    <div>
                      <Avatar src={node.avatar ? `https://www.gravatar.com/avatar/${node.avatar}` : ''}/>
                    </div>
                    <div className={classes.userInfo}>
                      <Nickname website={node.website} nickname={node.nickname} clickId={clickId} id={node.id}/>
                      <p>
                        <span>
                          {node.browser}
                         </span>
                        <span>
                          {node.time}
                        </span>
                        <span className={classes.replayIcon}>
                          <ReplayButton id={node.id} handleOpenModal={handleOpenModal}/>
                        </span>
                      </p>
                    </div>
                  </div>
                  {
                    parent && <ParentContent parent={parent} setClickId={setClickId}/>
                  }
                  <Content content={node.content}/>
                </div>
                <Divider variant={'middle'}/>
                {
                  node.child.size !== 0 && (
                    <TreeNode
                      nodes={node.child}
                      parent={{
                        id: node.id,
                        content: node.content,
                        nickname: node.nickname
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
  }

  return (
    <div>
      <TreeNode
        level={level}
        nodes={dictTree}
      />
    </div>
  );
}

export default React.memo(TreeView);
