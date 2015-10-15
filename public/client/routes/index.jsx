import React from 'react'
import { Router } from 'react-router'

import pageNotFound from './pageNotFound'
import slidesModules from './slidesModules'

export default (
  <Router>
    {slidesModules}
    {pageNotFound}
  </Router>
)
