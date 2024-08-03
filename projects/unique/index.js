import { getWidth, getHeight } from '../../assets/js/utils/window.js'

const cv = document.createElement('canvas')
cv.width = getWidth()
cv.height = getHeight()
document.body.append(cv)

const ctx = cv.getContext('2d')

const loop = () => {
  console.log('loop')
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)

const init = () => {
  console.log('init')
}

init()

document.body.style.margin = '0rem'
