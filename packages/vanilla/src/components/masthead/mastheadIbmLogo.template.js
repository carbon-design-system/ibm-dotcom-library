import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Masthead IBM Logo
 *
 * @returns {string} ES6 template literal of the Masthead IBM Logo
 *
 */
const mastheadIbmLogoTemplate = () => `
  <div
    data-autoid="${stablePrefix}--masthead-logo"
    className="${prefix}--header__logo">
    <a
      data-autoid="${stablePrefix}--masthead-logo__link"
      href="https://www.ibm.com/">
      <svg width="54" height="23">
        <path
          d="M0 22.082v-1.386h10.471v1.386H0zm0-2.909v-1.385h10.471v1.385H0zm2.992-2.908v-1.386h4.487v1.386H2.992zm0-2.91v-1.384h4.487v1.385H2.992zm0-2.908V9.062h4.487v1.385H2.992zm0-2.908V6.153h4.487V7.54H2.992zM0 4.629V3.245h10.471V4.63H0zm0-2.908V.336h10.471v1.385H0zm11.967 16.067h16.527c-.13.49-.322.955-.566 1.385h-15.96v-1.385zm2.992-1.523v-1.386h4.488v1.386h-4.488zM26.78 11.97c.432.402.803.868 1.098 1.386h-12.92V11.97H26.78zM14.96 9.062h12.968a5.836 5.836 0 01-1.097 1.385H14.959V9.062zM28.494 4.63H11.967V3.244h15.96c.245.43.437.895.567 1.386zM26.68 1.72H11.967V.336h11.015c1.41 0 2.701.522 3.698 1.385zM14.959 7.538V6.153h4.488v1.385h-4.488zm8.703 0V6.154h5.032c0 .478-.06.941-.167 1.386h-4.865zm0 7.341h4.865c.107.445.167.908.167 1.386h-5.032v-1.386zM38.35.33l.472 1.385h-8.904V.328h8.432zm-8.431 21.753v-1.386h7.481v1.386h-7.481zm0-2.91v-1.386h7.481v1.386h-7.481zm2.992-2.91v-1.385h4.49v1.385h-4.49zm0-2.91v-1.385h4.49v1.386h-4.49zm13.468 8.73v-1.386h7.482v1.386h-7.482zm0-2.91v-1.386h7.482v1.386h-7.482zm0-2.91v-1.385h4.49v1.385h-4.49zm0-2.91v-1.385h4.49v1.386h-4.49zm0-2.909v-1.32l-.458 1.32h-3.94l.473-1.386h8.415v1.386h-4.49zm-5.053-1.385l.472 1.385h-3.94l-.458-1.32v1.32H32.91V9.058h8.415zm9.542-2.91v1.385h-7.895l.471-1.385h7.424zM45.426.328h8.434v1.386h-8.906L45.426.33zm-3.54 21.754l-.475-1.386h.956l-.481 1.386zm-1.003-2.91l-.48-1.386h2.972l-.48 1.386h-2.012zm-1.009-2.91l-.48-1.385h4.99l-.48 1.385h-4.03zm-1.008-2.91l-.48-1.385h7.006l-.48 1.386h-6.046zM32.91 7.534V6.148h7.424l.472 1.385H32.91zm11.053-2.91l.472-1.385h9.425v1.386h-9.897zm-4.62-1.385l.472 1.386h-9.898V3.238h9.426zM11.967 20.696H26.68a5.627 5.627 0 01-3.698 1.386H11.967v-1.386z"
          fill="#000"
          fillRule="evenodd"
        />
      </svg>
    </a>
  </div>
`;

export default mastheadIbmLogoTemplate;
