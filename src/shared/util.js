export const comma = str => {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

export const uncomma = str => {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

export const getScrollHeight = () => {
  return Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
  )
}

export const copyUrlToClip = () => {
  const dummy = document.createElement("input");
  const text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}