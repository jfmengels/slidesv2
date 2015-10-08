import React from 'react'
import { Router } from 'react-router'

import app from './app'
import pageNotFound from './pageNotFound'
import slidesModules from './slidesModules'

export default (
  <Router>
    {app}
    {slidesModules}
    {pageNotFound}
  </Router>
)
