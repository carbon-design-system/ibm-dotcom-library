/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import '../content-section.scss';

const template = heading => html`
  <dds-content-section heading=${heading}>
    <p>This is a test.</p>
  </dds-content-section>
`;

describe('dds-section-content', function() {
  it('renders properly', async function() {
    await render(template('Test header'), document.body);
    await Promise.resolve();
    expect(document.body.querySelector('dds-content-section')).toMatchSnapshot({ mode: 'shadow' });
  });
  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
