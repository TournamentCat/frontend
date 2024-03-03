import EventEmitter from 'mitt'

const events = new EventEmitter()
const status = new Map()

export const set = (name, value) => void status.set(name, value)
export const get = name => status.get(name)
export const onToggle = (name, callback) => void events.on(name, callback)
export const toggle = name => void (set(name, !get(name)), events.emit(name))
export const zoomIn = name => void (get(name) ? 0 : toggle(name))
export const zoomOut = name => void (get(name) ? toggle(name) : 0)
export const toggleAll = (name, callbacks = []) => callbacks.forEach(callback => onToggle(name, callback))
export const onZoomIn = (name, callback) => onToggle(name, () => void (get(name) ? callback() : 0))
export const onZoomOut = (name, callback) => onToggle(name, () => void (get(name) ? 0 : callback()))
export const onZoomInOut = (name, cbIn, cbOut) => void (onZoomIn(name, cbIn), onZoomOut(name, cbOut))
