/**
 * 给定 url, 返回一个 window.URL 实例
 * @param url
 * @returns {*|URL}
 */
function parseUrl(url: string): URL {
  if (url.startsWith('//')) {
    url = location.protocol + url;
  }
  return new window.URL(url);
}

/**
 * 获取url中的参数
 * @param name 为参数名
 * @param url 为获取参数的URL
 */
export function getUrlParam(name: string, url = window.location.href): string {
  return parseUrl(url).searchParams.get(name) || url;
}

/**
 * 删除url中参数
 * @param name 为参数名
 * @returns {String}
 */
export function removeUrlParam(param: string, url = window.location.href): string {
  const obj = parseUrl(url);
  obj.searchParams.delete(param);
  return obj.href;
}

/**
 * 增加url中的参数
 * @param key
 * @param value
 * @param url
 * @returns {String}
 */
export function addUrlParam(key: string, value: string, url = window.location.href): string {
  const obj = parseUrl(url);
  obj.searchParams.set(key, value);
  return obj.href;
}
