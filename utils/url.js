export function prependURLProtocol (url) {
  if (!url.startsWith('http')) {
    return 'http://' + url
  }
  return url
}
