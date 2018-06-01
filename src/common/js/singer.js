class Singer {
  constructor(Obj) {
    this.singerName = Obj.Fsinger_name
    this.id = Obj.Fsinger_id
    this.imgUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Obj.Fsinger_mid}.jpg?max_age=2592000`
    this.prefix = Obj.Findex
  }
}
export default Singer