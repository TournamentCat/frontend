export default (cb, element = window) => element.addEventListener('mousemove', ({ clientY: y, clientX: x }) => cb(x, y))
