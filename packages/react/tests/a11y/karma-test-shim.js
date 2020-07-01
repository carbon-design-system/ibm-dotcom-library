/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const specContext = require.context(
  '../../src',
  true,
  process.env.AAT_STORIES_REGEXP // To be replaced by a Babel plugin
);

const storyModules = specContext.keys().map(specContext);

describe('Test a11y compliance', function() {
  const container = document.getElementById('html-fragment-container');

  storyModules
    .filter(
      storyModule =>
        !storyModule.default?.parameters?.['karma-accessibility-checker']
          ?.disabled
    )
    .forEach(storyModule => {
      const { title: groupTitle } = storyModule.default ?? {};

      Object.keys(storyModule)
        .filter(name => {
          const Story = storyModule[name];
          return (
            typeof Story === 'function' &&
            !Story.story?.parameters?.['karma-accessibility-checker']?.disabled
          );
        })
        .forEach(name => {
          const Story = storyModule[name];
          const { parameters, title = name } = Story.story ?? {};
          const props = Object.assign(
            {},
            storyModule.default?.parameters?.props,
            parameters?.props
          );

          it(`Should have a11y-compliant ${groupTitle}|${title}`, async function() {
            ReactDOM.render(<Story parameters={{ props }} />, container);
            await expectAsync(container).toBeACheckerCompliant();
          }, 30000);
        });
    });

  afterEach(function() {
    ReactDOM.render(undefined, container);
  });
});
