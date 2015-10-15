import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'

import Loading from '../components/loading'

export default class ModuleList extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      modules: []
    }
  }

  componentDidMount () {
    axios.get('/api/graphs/list')
    .then(({ data: modules }) => {
      this.setState({
        modules: modules
      })
    })
  }

  render () {
    const { modules } = this.state
    const { children } = this.props
    if (modules.length === 0) {
      return (
        <div>
          <Loading />
          {children}
        </div>
      )
    }

    const links = modules.map(({ ref, name }, index) => (
      <li key={index}>
        <Link to={`/${ref}`}>
          {name}
        </Link>
      </li>
    ))

    return (
      <div>
        <ul>
          {links}
        </ul>
        {children}
      </div>
    )
  }
}
