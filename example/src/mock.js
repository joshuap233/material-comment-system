// time,avatar
export const initData = [
  {
    child: [
      {
        browser: 'chrome',
        nickname: 'nickname1asdf',
        website: 'http://shushugo.com',
        email: 'shushugo233@gmail.com',
        id: '1231asdf',
        content: 'oooops',
        time: '2019/10/2 10:20',
        avatar: '4bd4bb9c9fa6057bb546b3c12a2c3e5c',
        child: [{
          browser: 'chrome',
          nickname: 'nickname1',
          website: '',
          email: '12313@qq.com',
          id: '1231123zcxv',
          content: 'test',
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
        content: 'i have a pen',
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
    content: 'i have an apple',
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
    content: `\`\`\`jsx
function ParentContent({parent, setClickId}) {
  return (
    <blockquote style={{
      // display: 'inline-block',
      borderLeft: '6px solid #DDDDDD',
      maxHeight: 200,
    }}>
      <a
        style={{
          textDecoration: 'none',
          color: '#757575'
        }}
        onClick={() => {
          setClickId(parent.id);
        }}>
         <span style={{marginLeft: 2}}>@{parent.nickname}</span>
        <span>:</span>
        <span>
          <ReactMarkdown source={parent.content}/>
        </span>
      </a>
    </blockquote>
  );
}      \`\`\`
    `
  },
];

export const newData = {
  bottom: true,
  data: [
    {
      child: [
        {
          browser: 'chrome',
          nickname: 'nickname1asdf',
          website: 'http://shushugo.com',
          email: '123@gmail.com',
          id: '1231a11sdf123123',
          content: 'test',
          time: '2019/10/2 10:20',
          avatar: '4bd4bb9c9fa6057bb546b3c12a2c3e5c',
          child: [{
            browser: 'chrome',
            nickname: 'nickname1',
            website: '',
            email: '12313@qq.com',
            id: '11112312321',
            content: 'test',
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
          id: '222123123123',
          content: 'test',
          time: '2019/10/2 10:20',
          avatar: '',
          child: []
        }
      ],
      browser: 'chrome',
      nickname: 'nickname123',
      website: 'https://www.asdfads123.com',
      email: 'nczkx@qq.com',
      id: 'abc1444212',
      time: '2019/10/2 10:20',
      content: 'test',
      avatar: ''
    },
  ]
};
