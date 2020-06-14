# material-comment-system

> a comment system component based on material-ui

[![NPM](https://img.shields.io/npm/v/material-comment-system.svg)](https://www.npmjs.com/package/material-comment-system) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
npm
```bash
npm install --save material-comment-system
```

yarn
```bash
yarn add npm install --save material-comment-system
```

## Usage
```jsx
import React, {useCallback} from 'react';
import {initData, newData} from "./mock";


import {Comments, Editor, Provider} from 'material-comment-system';
import 'material-comment-system/dist/index.css';

const App = () => {
  const initApi = useCallback(() => new Promise((resolve) => {
    setTimeout(() => {
      // mock fetch data
      resolve(initData);
    }, 500);
  }), []);

  const loadMoreAPi = useCallback(() => new Promise(resolve => {
    setTimeout(() => {
      resolve(newData);
    }, 500);
  }), []);

  const submitApi = useCallback((data) => {
    console.log('submit data', data);
    //post data
  }, []);

  return (
    <Provider>
      <div>
        <Editor submitApi={submitApi}/>
      </div>
      <div style={{marginTop: 20}}>
        <Comments initApi={initApi} loadMoreAPi={loadMoreAPi}/>
      </div>
    </Provider>
  );
};

export default App;
```

## API
### Editor
```jsx
import {Editor} from 'material-comment-system';
```
The following options are supported passed to Editor(options)
- submitApi
  - Required
  - function
  - Must be memoized(wrap the function in useCallback) or use static function
### Comments
```jsx
import {Comments, Editor, Provider} from 'material-comment-system';
```

Options:
- loadMoreAPi
  - Required
  - function(return Promise)
  - Must be memoized(wrap the function in useCallback) or use static function
- initApi
  - Required
  - function(return Promise)
  - Must be memoized(wrap the function in useCallback) or use static function
## Provider
```jsx
import {Provider} from 'material-comment-system';
```
Options:
- codeHighlighting
  - default: {preview:true,quote:false,content:true}
    - quote  //comments quote code highlighting
    - content // comments quote code highlighting
    - preview // editor preview code highlighting
## API example

```jsx
const newData = {
  bottom: true, // Is it the last piece of data
  data: [
    {
      child: [
        {
          browser: 'chrome',
          nickname: 'nickname1asdf',
          website: 'http://shushugo.com',
          email: '123@gmail.com',
          id: '1231a11sdf',
          content: 'test',
          time: '2019/10/2 10:20',
          avatar: '4bd4bb9c9fa6057bb546b3c12a2c3e5c',
          child: [{
            browser: 'chrome',
            nickname: 'nickname1',
            website: '',
            email: '12313@qq.com',
            id: '111',
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
          id: '222',
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

const loadMoreAPi = useCallback(() => new Promise(resolve => {
    setTimeout(() => {
      resolve(newData);
    }, 500);
}), []);
```

```jsx
const initData = [
  {
    child: [{
        browser: 'chrome',
        nickname: 'nickname1asdf',
        website: 'http://shushugo.com',
        email: 'shushugo233@gmail.com', // use email to get avatar (https://en.gravatar.com/)
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
    content: `content`
  },
];

const initAPi = useCallback(() => new Promise(resolve => {
    setTimeout(() => {
      resolve(newData);
    }, 500);
}), []);
```


## TODO
- device detect
- admin system
- emoji support
- leancloud support
- i18n
- Count visits

## License

MIT © [pjshu](https://github.com/pjshu)
