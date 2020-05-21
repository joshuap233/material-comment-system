import React, {useCallback, useEffect, useState} from 'react';
import TreeView from "./treeView/TreeView";
import './global.css';
import Editor, {PortalEditor} from "./editor/Editor";
import {hot} from 'react-hot-loader';

// time,avatar
const DICTTREE = [
  {
    child: [
      {
        browser: 'chrome',
        nickname: 'nickname1asdf',
        website: 'http://shushugo.com',
        email: 'shushugo233@gmail.com',
        id: '1231asdf',
        content: '试试',
        time: '2019/10/2 10:20',
        avatar: '4bd4bb9c9fa6057bb546b3c12a2c3e5c',
        child: [{
          browser: 'chrome',
          nickname: 'nickname1',
          website: '',
          email: '12313@qq.com',
          id: '1231123zcxv',
          content: '试试',
          time: '2019/10/2 10:20',
          avatar: '',
          child: []
        }]
      },
      {
        browser: 'chrome',
        nickname: 'nickname12',
        website: '',
        email: 'adfads@qq.com',
        id: '123654',
        content: '还行',
        time: '2019/10/2 10:20',
        avatar: '',
        child: []
      }
    ],
    browser: 'chrome',
    nickname: 'nickname123',
    website: 'https://www.asdfads123.com',
    email: 'nczkx@qq.com',
    id: 'abc1212',
    time: '2019/10/2 10:20',
    content: '第一',
    avatar: ''
  }, {
    child: [],
    browser: 'chrome',
    nickname: 'abcnickname123',
    website: 'https://www.asdfaddds123.com',
    email: 'nczkxd@qq.com',
    id: 'abc121da2',
    time: '2019/10/2 10:20',
    avatar: '',
    content: '```\n' +
      'function ParentContent({parent, setClickId}) {\n' +
      '  return (\n' +
      '    <blockquote style={{\n' +
      '      // display: \'inline-block\',\n' +
      '      borderLeft: \'6px solid #DDDDDD\',\n' +
      '      maxHeight: 200,\n' +
      '    }}>\n' +
      '      <a\n' +
      '        style={{\n' +
      '          textDecoration: \'none\',\n' +
      '          color: \'#757575\'\n' +
      '        }}\n' +
      '        href={`#${parent.id}`}\n' +
      '        onClick={() => {\n' +
      '          setClickId(parent.id);\n' +
      '        }}>\n' +
      '         <span style={{marginLeft: 2}}>@{parent.nickname}</span>\n' +
      '        <span>:</span>\n' +
      '        <span>\n' +
      '          <ReactMarkdown source={parent.content}/>\n' +
      '        </span>\n' +
      '      </a>\n' +
      '    </blockquote>\n' +
      '  );\n' +
      '}\n```'
  },
];


function App() {
  // 记录id与child,方便插入节点
  const [dictTree, setDictTree] = useState([]);
  const [replayId, setReplayId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    //TODO:fetch dictTree
    setDictTree(DICTTREE);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setReplayId(null);
  }, []);

  const handleOpenModal = useCallback((nodeId) => {
    setModalOpen(true);
    setReplayId(nodeId);
  }, []);

  return (
    <div>
      <Editor
        setModalOpen={setModalOpen}
        replayId={replayId}
        setDictTree={setDictTree}
      />
      {
        modalOpen && (
          <PortalEditor
            setModalOpen={setModalOpen}
            replayId={replayId}
            handleCloseModal={handleCloseModal}
            setDictTree={setDictTree}
          />
        )
      }
      <TreeView
        dictTree={dictTree}
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
}

export default hot(module)(App);
