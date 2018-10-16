import storage from 'good-storage'
const localHistory = '_localSearch_'
const searchLimit = 50
const playHistory = '_playHistory_'
const playLimit = 50
function _getLocal(key) {
  let list = []
  if (storage.has(key)) {
    list = storage.get(key)
  }
  return list
}

function _storeLocal(list, keyword, limit, compare) {
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
  list = _storeLocal(list, query, searchLimit, function(item) {
    if (item) {
      return item === query
    }
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
  if (list && list.length > 0) {
    list = _deleteLocal(list, (item) => {
      if (item) {
        return item === query
      }
    })
  }
  storage.set(localHistory, list)
  return list
}

export function removeLocalHistory() {
  storage.set(localHistory, [])
}

export function storePlayHistory(song) {
  let list = _getLocal(playHistory)
  if (list && list.length > 0) {
    list = _storeLocal(list, song, playLimit, function(item) {
      if (item && item.songid) {
        return item.songid === song.songid
      }
    })
  }
  storage.set(playHistory, list)
  return list
}

export function getPlayHistory(song) {
  return _getLocal(playHistory)
}