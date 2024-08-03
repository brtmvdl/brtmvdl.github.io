// 

export const getWidth = () => window.innerWidth

export const getHeight = () => window.innerHeight

export const getAspect = () => getWidth() > getHeight() ? getWidth() / getHeight() : getHeight() / getWidth()
