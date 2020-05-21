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
  for (let node of nodes) {
    if (node.id === id) {
      node.child.push(data);
      break;
    } else {
      updateDictTreeNode(node.child, id, data);
    }
  }
};

export {getCurrentTime, getBrowserVersion, updateDictTreeNode};
