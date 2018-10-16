export function randomInt(small, big) {
  return Math.floor((big - small + 1) * Math.random()) + small
}

export function randomList(_list) {
  let list = _list.slice()
  let length = list.length
  list.forEach((element, index) => {
    let idx = randomInt(0, length - 1)
    let temp = list[idx]
    list[idx] = element
    list[index] = temp
  })
  return list
}
