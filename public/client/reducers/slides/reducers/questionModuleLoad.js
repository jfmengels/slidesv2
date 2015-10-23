import u from 'updeep'

export default (state, { moduleRef, slides, graph }) => {
  const updater = {
    [moduleRef]: {
      slides,
      graph,
      remainingLives: 3,
      currentSlideRef: graph.startPoints[0]
    }
  }
  return u(updater, state)
}
