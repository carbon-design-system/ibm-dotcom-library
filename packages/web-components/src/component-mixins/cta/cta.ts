/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import Download20 from 'carbon-web-components/es/icons/download/20.js';
import Launch20 from 'carbon-web-components/es/icons/launch/20.js';
import PlayOutline20 from 'carbon-web-components/es/icons/play--outline/20.js';
import { Constructor } from '../../globals/defs';
import { CTA_TYPE } from '../../components/cta/defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Icons to use, keyed by CTA type.
 */
export const icons = {
  [CTA_TYPE.LOCAL]: ArrowRight20,
  [CTA_TYPE.DOWNLOAD]: Download20,
  [CTA_TYPE.EXTERNAL]: Launch20,
  [CTA_TYPE.JUMP]: ArrowDown20,
  [CTA_TYPE.VIDEO]: PlayOutline20,
};

export const ariaLabels = {
  [CTA_TYPE.LOCAL]: '',
  [CTA_TYPE.DOWNLOAD]: ' - This link downloads a file',
  [CTA_TYPE.EXTERNAL]: ' - This link opens in a new tab',
  [CTA_TYPE.JUMP]: '',
  [CTA_TYPE.VIDEO]: ' - This link plays a video',
};

/**
 * @param Base The base class.
 * @returns A mix-in implementing the logic of handling link for CTA.
 */
const CTAMixin = <T extends Constructor<HTMLElement>>(Base: T) => {
  abstract class CTAMixinImpl extends Base {
    /**
     * The `<a>`.
     *
     * @internal
     */
    abstract _linkNode;

    /**
     * Handles `click` event on the `<a>.
     *
     * @param event The event.
     */
    _handleClick(event: MouseEvent) {
      const { disabled } = this;
      if (disabled) {
        event.preventDefault(); // Stop following the link
        event.stopPropagation(); // Stop firing `onClick`
      }
    }

    /**
     * The CTA type.
     */
    abstract ctaType: CTA_TYPE;

    /**
     * `true` if the button should be disabled.
     */
    abstract disabled?: boolean;

    /**
     * The default file name.
     */
    abstract download?: string;

    /**
     * Link `href`.
     */
    abstract href?: string;

    /**
     * The link target.
     */
    abstract target?: string;

    /**
     * @returns The template for the icon.
     */
    _renderIcon() {
      const { ctaType } = this;
      return html`
        <slot name="icon">${icons[ctaType]?.({ class: `${prefix}--card__cta ${ddsPrefix}-ce--cta__icon` })}</slot>
      `;
    }

    /**
     * Handles `.updated()` method of `lit-element`.
     */
    updated(changedProperties) {
      // Declaring this mixin as it extends `LitElement` seems to cause a TS error
      // @ts-ignore
      super.updated(changedProperties);
      const { ctaType, _linkNode: linkNode } = this;
      if (changedProperties.has('ctaType') || changedProperties.has('download')) {
        const { download } = this;
        if (ctaType !== CTA_TYPE.DOWNLOAD && download) {
          // eslint-disable-next-line no-console
          console.warn(`\`download\` property used with a CTA data item besides \`type: download\` (\`type: ${ctaType}\`).`);
        }
      }
      // TODO: See why `linkNode` can possibly be `null`
      if (linkNode && linkNode.nodeName === 'A') {
        if (changedProperties.has('ctaType') || changedProperties.has('href')) {
          const { href } = this;
          const hrefValue = ctaType !== CTA_TYPE.VIDEO ? href : '#';
          // If this CTA is of video, uses the link as the action button
          if (hrefValue == null) {
            linkNode.removeAttribute('href');
          } else {
            linkNode.setAttribute('href', hrefValue);
          }
        }
        if (changedProperties.has('ctaType') || changedProperties.has('target')) {
          // If this CTA is of an external link, defaults the target to `_blank`
          const { target } = this;
          const targetInEffect = target || ctaType !== CTA_TYPE.EXTERNAL ? undefined : '_blank';
          if (!targetInEffect) {
            linkNode.removeAttribute('target');
          } else {
            linkNode.setAttribute('target', targetInEffect);
          }
        }
        if(linkNode.hasAttribute('aria-label')){
          linkNode.setAttribute('aria-label', linkNode.getAttribute('aria-label') + (ctaType ? ariaLabels[ctaType] : ''))
        }
      }
    }
  }

  return CTAMixinImpl;
};

export type CTAMixinImpl = InstanceType<ReturnType<typeof CTAMixin>>;

export default CTAMixin;
