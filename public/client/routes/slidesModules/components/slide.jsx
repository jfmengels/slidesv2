import React from 'react'

export default class Slide extends React.Component {
  render () {
    const { data } = this.props;
    const choices = data
      .getIn(['question', 'content', 'choices'])
      .map((choice, index) => <li key={index}>{choice.get('label')}</li>)

    return (
      <div>
        Question {data.get('ref')}
        <p>{data.getIn(['question', 'header'])}</p>
        <ul>
          {choices}
        </ul>
      </div>
    )
  }
}
