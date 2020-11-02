/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MastheadLogo from '@carbon/ibmdotcom-styles/icons/svg/IBM-8bar-logo--h23.svg';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import TooltipDefinition from '../../internal/vendor/carbon-components-react/components/TooltipDefinition';

const { prefix } = settings;

const CustomLogo = props => (
  <svg width="58" height="23" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="nonzero" fill="none">
      <path fill="#EC1D24" d="M58 21.467V23h-7.632v-1.533zM39.684 21.467V23h-7.631v-1.533zM45.639 21.467L45.025 23l-.606-1.533zM28.542 21.467A6.285 6.285 0 0124.391 23H12.21v-1.533h16.331zM10.684 21.467V23H0v-1.533z"/>
      <path fill="#FFF100" d="M39.684 18.4v1.533h-7.631V18.4zM46.832 18.4l-.594 1.533H43.82l-.598-1.533zM30.068 18.4a5.719 5.719 0 01-.64 1.533H12.21V18.4h17.857zM10.684 18.4v1.533H0V18.4zM58 18.4v1.533h-7.632V18.4z"/>
      <path fill="#EC1D24" d="M54.947 15.333v1.534h-4.579v-1.534zM39.684 15.333v1.534h-4.579v-1.534zM48.03 15.333l-.6 1.534h-4.807l-.604-1.534zM29.855 15.333c.137.49.213 1.003.213 1.534h-5.647v-1.534h5.434zM19.842 15.333v1.534h-4.579v-1.534zM7.632 15.333v1.534h-4.58v-1.534z"/>
      <path fill="#00A550" d="M54.947 12.267V13.8h-4.579v-1.533zM39.684 12.267V13.8h-4.579v-1.533zM49.225 12.267l-.597 1.533h-7.22l-.591-1.533zM27.977 12.267c.527.432.98.951 1.328 1.533H15.263v-1.533h12.714zM7.632 12.267V13.8h-4.58v-1.533z"/>
      <path fill="#EC1D24" d="M44.599 9.2l.427 1.24.428-1.24h9.493v1.533h-4.579V9.324l-.519 1.41h-9.661l-.504-1.41v1.41h-4.579V9.2zM7.632 9.2v1.533h-4.58V9.2zM29.305 9.2a5.95 5.95 0 01-1.328 1.533H15.263V9.2h14.042z"/>
      <path fill="#2E3092" d="M54.947 6.133v1.534h-8.964l.54-1.534zM43.534 6.133l.54 1.534h-8.969V6.133zM30.068 6.133c0 .531-.076 1.045-.213 1.534H24.42V6.133h5.647zM19.842 6.133v1.534h-4.579V6.133zM7.632 6.133v1.534h-4.58V6.133z"/>
      <path fill="#EC1D24" d="M42.477 3.067l.53 1.533H32.054V3.067zM58 3.067V4.6H47.04l.55-1.533zM29.427 3.067c.284.473.504.988.641 1.533H12.211V3.067h17.216zM10.684 3.067V4.6H0V3.067z"/>
      <path fill="#2E3092" d="M41.406 0l.54 1.533h-9.893V0zM58 0v1.533h-9.881L48.647 0zM24.39 0c1.601 0 3.057.581 4.152 1.533H12.211V0h12.18zM10.684 0v1.533H0V0z"/>
    </g>
  </svg>
);

/**
 * IBM Logo 8-bar component.
 */
const IbmLogo = ({ autoid, logoData }) => {
  console.log('logo data', logoData);

  return (
    <div className={`${prefix}--header__logo`}>
      <TooltipDefinition tooltipText="Some tooltip text">
        <a aria-label="IBM®" data-autoid={autoid} href="https://www.ibm.com/">
          <CustomLogo />
        </a>
      </TooltipDefinition>
    </div>
)};

export default IbmLogo;

IbmLogo.propTypes = {
  /**
   * data-autoid attribute for analytics
   */
  autoid: PropTypes.string,
};
