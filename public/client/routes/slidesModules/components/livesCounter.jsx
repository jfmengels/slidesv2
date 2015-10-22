import React from 'react'

import styles from './livesCounter.css'

export default ({ remainingLives, initialLives=3 }) => {
  const containerStyles = []

  for (let i = 0; i < initialLives; i++) {
    const style = i < remainingLives ? styles.full : styles.empty
    containerStyles.push(style)
  }

  const heartContainers = containerStyles
    .map((style, index) => <span key={index} className={style}>X</span>)

  return (
    <div>
      {heartContainers}
    </div>
  )
}
