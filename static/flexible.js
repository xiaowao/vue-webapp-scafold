function resize () {
  var deviceWidth = document.documentElement.clientWidth
  document.documentElement.style.fontSize = (deviceWidth / 10) + 'px'
}

export {
  resize
}
