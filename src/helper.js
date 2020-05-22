const getBrowserVersion = () => {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  const browsers = [
    'Edge', 'IE', 'Chrome', 'Opera', 'Firefox', 'Safari'
  ];
  for (let b of browsers) {
    const regex = new RegExp(b + '/.* ?', 'i');
    const match = userAgent.match(regex);
    if (match) {
      browser = match[0].split(' ')[0];
      break;
    }
  }
  return browser;
};

const getCurrentTime = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  return {formatTime: `${year}/${month}/${date} ${hour}:${minutes < 10 ? 0 : ''}${minutes}`, timestamp: d.getTime()};
};

const updateDictTreeNode = (nodes, id, data) => {
  const _updateDictTreeNode = (nodes) => {
    return nodes.map(node => {
      if (node.get('id') === id) {
        return node.update('child', value => value.push(data));
      } else {
        const res = _updateDictTreeNode(node.get('child'));
        if (res !== node.get('child')) {
          return node.update('child', () => res);
        }
        return node;
      }
    });
  };
  return _updateDictTreeNode(nodes);
};

export {getCurrentTime, getBrowserVersion, updateDictTreeNode};
