let state = false

export const press = () => void (state = true)
export const release = () => void (state = false)
export const isPressed = () => state
