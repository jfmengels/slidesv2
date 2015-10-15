import React from 'react'
import { Route } from 'react-router'

import ModuleList from './containers/moduleList'
import SlidesModules from './containers/slidesModules'

export default (
  <Route path='/' component={ModuleList}>
    <Route path=':ref' component={SlidesModules} />
  </Route>
)
