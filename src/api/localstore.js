import storage from 'good-storage'
const localHistory = '_localSearch_'
const limit = 10
function _getLocal(key) {
  let list = []
  if (storage.has(key)) {
    list = storage.get(key)
  }
  return list
}

function _storeLocal(list, keyword, compare) {
  let index = list.findIndex(compare)
  if (index === -1 && list.length > (limit - 1)) {
    list.pop()
  } else if (index > -1) {
    list.splice(index, 1)
  }
  list.unshift(keyword)
  return list
}

export function storeLocalSearch(query) {
  let list = _getLocal(localHistory)
  list = _storeLocal(list, query, function(item) {
    return item === query
  })
  storage.set(localHistory, list)
  return list
}

function _deleteLocal(list, compare) {
  let index = list.findIndex(compare)
  if (index !== -1) {
    list.splice(index, 1)
  }
  return list
}
export function getLocalSearch() {
  return _getLocal(localHistory)
}

export function deleteLocalHistory(query) {
  let list = _getLocal(localHistory)
  list = _deleteLocal(list, (item) => {
    return item === query
  })
  storage.set(localHistory, list)
  return list
}

export function removeLocalHistory() {
  storage.set(localHistory, [])
}