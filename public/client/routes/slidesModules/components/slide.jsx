import React from 'react'

import ValidateButton from './validateButton'
import styles from './slide.css'

export default class Slide extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    onSendAnswer: React.PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      selectedAnswer: -1
    }
  }

  onSelect (choiceIndex) {
    this.setState({
      selectedAnswer: choiceIndex
    })
  }

  onValidate () {
    const { data, onSendAnswer } = this.props;
    const answer = data.getIn(['question', 'content', 'choices', this.state.selectedAnswer, 'value'])
    console.log(answer);
    onSendAnswer(answer)
  }

  render () {
    const { data } = this.props;
    const choices = data
      .getIn(['question', 'content', 'choices'])
      .map((choice, index) => (
        <li key={index}
            onClick={() => this.onSelect(index)}
            className={index === this.state.selectedAnswer ? styles.selected : ''}>
          {choice.get('label')}
        </li>
      ))

    return (
      <div>
        Question {data.get('ref')}
        <p>{data.getIn(['question', 'header'])}</p>
        <ul>
          {choices}
        </ul>
        <ValidateButton
          disabled={this.state.selectedAnswer === -1}
          onValidate={() => this.onValidate()}
        />
      </div>
    )
  }
}
