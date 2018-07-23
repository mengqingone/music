import {getSongUrl} from '@/api/singer.js'
export class Song {
  constructor(songid, songmid, singer, songname, albumid, albummid, albumname, duration, image, url) {
    this.songid = songid
    this.songmid = songmid
    this.singer = singer
    this.songname = songname
    this.albumid = albumid
    this.albummid = albummid
    this.albumname = albumname
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(obj) {
  let songid = obj.songid
  let songmid = obj.songmid
  let singer = ''
  if (obj.singer && obj.singer.length > 0) {
    obj.singer.forEach(element => {
      singer += element.name + '/'
    })
    singer = singer.substring(0, singer.length - 1)
  }
  let songname = obj.songname
  let albumid = obj.albumid
  let albummid = obj.albummid
  let albumname = obj.albumname
  let duration = obj.interval
  let image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj.albummid}.jpg`
  let url = ''
  return new Song(songid, songmid, singer, songname, albumid, albummid, albumname, duration, image, url)
}

export function setUrl(song) {
  let songmid = song.songmid
  return new Promise(function (resolve, reject) {
    getSongUrl(songmid, 'C400' + songmid + '.m4a').then(
      (res) => {
        let songinfo = res.data
        if (songinfo && songinfo.items && songinfo.items.length) {
          let vkey = songinfo.items[0].vkey
          if (vkey !== '') {
            song.url = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?vkey=${vkey}&guid=${res.guid}&uin=0&fromtag=38`
          }
        }
        resolve()
      },
      (err) => {
        reject(err)
      }
    )
  })
}