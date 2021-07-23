
function getSelectors(path) {
  return path.reverse()
  .filter(ele => ele !== document && ele !== window)
  .map(ele => {
    let selector = '';
    if (ele.id) {
      return `${ele.nodeName.toLowerCase()}#${ele.id}`;
    }
    else if (ele.className && typeof ele.className === 'string') {
      return `${ele.nodeName.toLowerCase()}.${ele.className}`;
    }
    else {
      selector = ele.nodeName.toLowerCase();
    }
    return selector
  }).join(' ');
}

export default function (path) {
  if (Array.isArray(path)) {
    return getSelectors(path);
  }
}