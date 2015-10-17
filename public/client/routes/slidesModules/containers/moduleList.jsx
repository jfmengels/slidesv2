import React, { PropTypes } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { loadModuleList } from '../../../reducers/modules/actions'

import Loading from '../components/loading'

function mapStateToProps (state) {
  return {
    modules: state.get('modules')
  }
}

const mapDispatchToProps = {
  loadModuleList
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ModuleList extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    modules: PropTypes.object.isRequired,
    loadModuleList: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (this.props.modules.size === 0) {
      axios.get('/api/graphs/list')
      .then(({ data: modules }) => {
        this.props.loadModuleList(modules)
      })
    }
  }

  render () {
    const { children, modules } = this.props
    if (modules.size === 0) {
      return (
        <div>
          <Loading />
          {children}
        </div>
      )
    }

    const links = modules.toJS().map(({ ref, name }, index) => (
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
