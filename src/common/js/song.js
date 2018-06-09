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
  let duration = obj.size128
  let image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${obj.albumid}.jpg`
  let url = ''
  return new Song(songid, songmid, singer, songname, albumid, albummid, albumname, duration, image, url)
}

export function setSongUrl(song) {
  let songmid = song.songmid
  return new Promise(function (resolve, reject) {
    getSongUrl(songmid, 'C400' + songmid + '.m4a').then(
      (res) => {
        let songinfo = res.data
        if (songinfo && songinfo.items && songinfo.items.length) {
          let vkey = songinfo.items[0].vkey
          song.url = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?vkey=${vkey}&guid=1819638027&uin=0&fromtag=66`
        }
        resolve()
      },
      (err) => {
        console.log(err)
        reject(err)
      }
    )
  })
}