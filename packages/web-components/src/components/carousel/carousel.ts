/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, internalProperty, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import CaretLeft20 from 'carbon-web-components/es/icons/caret--left/20.js';
import CaretRight20 from 'carbon-web-components/es/icons/caret--right/20.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import DDSCard from '../card/card';
import styles from './carousel.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const MAX_GESTURE_DURATION = 300; // max time allowed to do swipe
const MIN_DISTANCE_TRAVELLED = 75; // min distance traveled to be considered swipe

/**
 * Carousel.
 *
 * @element dds-carousel
 * @csspart prev-button The button to go to the previous page.
 * @csspart next-button The button to go to the next page.
 */
@customElement(`${ddsPrefix}-carousel`)
class DDSCarousel extends HostListenerMixin(StableSelectorMixin(LitElement)) {
  /**
   * The scrolling contents node.
   */
  @query(`.${prefix}--carousel__scroll-contents`)
  private _contentsNode?: HTMLElement;

  /**
   * The width of the scroll contents area node, excluding one of overflowed contents.
   */
  @internalProperty()
  private _contentsBaseWidth = 0;

  /**
   * The gap width between each card.
   */
  @internalProperty()
  private _gap = 0;

  /**
   * The observer for the resize of the scroll container.
   */
  private _observerResizeContainer: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The page size that is explicitly set.
   */
  @internalProperty()
  private _pageSize?: number;

  /**
   * The page size that is automatically calculated upon viewport size
   * via `--dds--carousel--page-size` CSS custom property.
   * If `page-size` attribute is set, this value is ignored.
   */
  @internalProperty()
  private _pageSizeAuto = 1;

  /**
   * The default slot.
   */
  @query('slot:not([name])')
  private _slotNode?: HTMLSlotElement;

  /**
   * The number of total items.
   */
  @internalProperty()
  private _total = 0;

  /**
   * Initial touch position (used to detect swipe gesture)
   */
  @internalProperty()
  private _startPos = 0;

  /**
   * Initial touch time (used to detect swipe gesture)
   */
  @internalProperty()
  private _startTime = 0;

  /**
   * Cleans-up and creats the resize observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    const { _contentsNode: contentsNode } = this;
    if (contentsNode) {
      if (this._observerResizeContainer) {
        this._observerResizeContainer.disconnect();
        this._observerResizeContainer = null;
      }
      if (this._observerResizeRoot) {
        this._observerResizeRoot.disconnect();
        this._observerResizeRoot = null;
      }
      if (create) {
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeRoot = new ResizeObserver(this._observeResizeRoot);
        this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeContainer = new ResizeObserver(this._observeResizeContainer);
        this._observerResizeContainer.observe(contentsNode);
      }
    }
  }

  /**
   * Stops the container from scrolling when focusing on a card outside of the viewport.
   *
   * @param event The event.
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleScrollFocus({ target }: Event) {
    (target as HTMLElement).scrollTo(0, 0);
  }

  /**
   * Handles card focus throughout pages.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = async ({ target, relatedTarget }: FocusEvent) => {
    const currentContains = target !== this && this.contains(target as DDSCard);
    const oldNotContains = target !== this && !this.contains(relatedTarget as DDSCard);
    const currentCardIndex = Array.from(this.children).indexOf((target as HTMLElement).parentElement!);

    // Confirmed by design team; ensures the carousel remains on the current page when focusing back on the component.
    // This conforms to the natural flow of the current content on the screen.
    // The first card on the page should be focused if tabbing from the top,
    // The last card on the page should be focused if tabbing from the bottom.
    if (currentContains && oldNotContains) {
      // focus coming from the top
      if (currentCardIndex === 0) {
        (this.children[this.start] as HTMLElement).focus();

        // focus coming from bottom
      } else if (currentCardIndex === this._total - 1) {
        (this.children[this.start + this.pageSize - 1] as HTMLElement).focus();
      }
      return;
    }

    // Calculates proper page to display if focus is outside the current page
    if (currentContains && (currentCardIndex < this.start || currentCardIndex >= this.start + this.pageSize)) {
      // The `currentIndex` floored by `pageSize`
      const nextStart = Math.floor(currentCardIndex / this.pageSize) * this.pageSize;
      const pageOffset = this.start % this.pageSize;

      // Ensures the page moves by `this.pageSize` in either direction
      this.start = nextStart + pageOffset;
    }
  };

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { pageSize, start, _total: total } = this;
    this.start = Math.min(start + pageSize, total - 1);
  }

  /**
   * Handles `click` event on the prev button.
   */
  private _handleClickPrevButton() {
    const { pageSize, start } = this;
    this.start = Math.max(start - pageSize, 0);
  }

  /**
   * Handles `touchstart` event.
   */
  private _handleTouchStartEvent(event: TouchEvent) {
    this._startPos = event.touches[0].clientX;
    this._startTime = new Date().getTime();
  }

  /**
   * Handles `touchend` event.
   */
  private _handleTouchEndEvent(event: TouchEvent) {
    const { _startPos, _startTime } = this;
    const { pageSize, start, _total: total } = this;

    const distTravelled = event.changedTouches[0].clientX - _startPos; // distance travelled
    const elapsedTime = new Date().getTime() - _startTime; // elapsed time

    if (elapsedTime <= MAX_GESTURE_DURATION && Math.abs(distTravelled) >= MIN_DISTANCE_TRAVELLED) {
      if (distTravelled < 0) {
        this.start = Math.min(start + pageSize, total - 1);
      } else {
        this.start = Math.max(start - pageSize, 0);
      }
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const { name } = slot;
    if (!name) {
      this._total = slot.assignedNodes().filter(node => node.nodeType === Node.ELEMENT_NODE).length;
    }
    this._updateGap();
  }

  /**
   * The observer for the resize of the scroll container.
   */
  private _observeResizeContainer = records => {
    const { contentRect } = records[records.length - 1];
    const { width: contentsBaseWidth } = contentRect;
    this._contentsBaseWidth = contentsBaseWidth;
    this._updateGap();
  };

  /**
   * The observer for the resize of the viewport.
   */
  private _observeResizeRoot = () => {
    const { customPropertyPageSize } = this.constructor as typeof DDSCarousel;
    const { _contentsNode: contentsNode } = this;
    const { defaultView: w } = this.ownerDocument!;
    this._pageSizeAuto = Number(w!.getComputedStyle(contentsNode!).getPropertyValue(customPropertyPageSize));
  };

  /**
   * @returns Page status text.
   */
  private _renderStatus() {
    const { start, pageSize, formatStatus, _total: total } = this;
    // Copes with the condition where `start % pageSize` is non-zero
    const pagesBefore = Math.ceil(start / pageSize);
    const pagesSince = Math.ceil((total - start) / pageSize);
    return formatStatus({ currentPage: Math.ceil(start / pageSize) + 1, pages: pagesBefore + pagesSince });
  }

  /**
   * Calculates the width between cards.
   */
  private _updateGap() {
    const { _contentsNode: contentsNode, _slotNode: slotNode } = this;
    const elems = slotNode!.assignedNodes().filter(node => node.nodeType === Node.ELEMENT_NODE);
    this._gap =
      elems.length <= 1
        ? 0
        : (contentsNode!.scrollWidth - elems.reduce((acc, elem) => acc + ((elem as HTMLElement).offsetWidth ?? 0), 0)) /
          (elems.length - 1);
  }

  /**
   * The formatter for the pagination status. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatStatus = ({ currentPage, pages }) => `${currentPage} / ${pages}`;

  /**
   * Number of items per page.
   * If `--dds--carousel--page-size` CSS custom property is set to `<div class="bx--carousel__scroll-container">`
   * or its ancestor (e.g. the host `<dds-carousel>`), this is set automatically from `--dds--carousel--page-size`.
   */
  @property({ type: Number, attribute: 'page-size' })
  get pageSize() {
    const { _pageSize: pageSize, _pageSizeAuto: pageSizeAuto } = this;
    return pageSize ?? pageSizeAuto;
  }

  set pageSize(value: number) {
    this._pageSize = value;
    // Don't call `.requestUpdate()` here given we track updates via `_pageSize` and `_pageSizeAuto`
  }

  /**
   * The assistive text for the button to go to next page.
   */
  @property({ attribute: 'next-button-text' })
  nextButtonText = 'Next page';

  /**
   * The assistive text for the button to go to previous page.
   */
  @property({ attribute: 'prev-button-text' })
  prevButtonText = 'Previous page';

  /**
   * The current zero-based index of the left-most card.
   */
  @property({ type: Number })
  start = 0;

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverResize();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._cleanAndCreateObserverResize({ create: true });
  }

  render() {
    const { customPropertyPageSize } = this.constructor as typeof DDSCarousel;
    const {
      nextButtonText,
      pageSize,
      prevButtonText,
      start,
      _contentsBaseWidth: contentsBaseWidth,
      _gap: gap,
      _pageSize: pageSizeExplicit,
      _total: total,
      _handleClickNextButton: handleClickNextButton,
      _handleClickPrevButton: handleClickPrevButton,
      _handleScrollFocus: handleScrollFocus,
      _handleSlotChange: handleSlotChange,
      _handleTouchStartEvent: handleTouchStartEvent,
      _handleTouchEndEvent: handleTouchEndEvent,
    } = this;
    // Copes with the condition where `start % pageSize` is non-zero
    const pagesBefore = Math.ceil(start / pageSize);
    const pagesSince = Math.ceil((total - start) / pageSize);
    // Use another div from the host `<dds-carousel>` to reflect private state
    return html`
      <div
        class="${prefix}--carousel__scroll-container"
        @scroll="${handleScrollFocus}"
        @touchstart="${handleTouchStartEvent}"
        @touchend="${handleTouchEndEvent}"
        style="${ifNonNull(pageSizeExplicit == null ? null : `${customPropertyPageSize}: ${pageSizeExplicit}`)}"
      >
        <div class="${prefix}--carousel__scroll-contents" style="left:${(-start * (contentsBaseWidth + gap)) / pageSize}px">
          <slot @slotchange="${handleSlotChange}"></slot>
        </div>
      </div>
      <div class="${prefix}--carousel__navigation">
        <button
          part="prev-button"
          class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
          ?disabled="${pagesBefore === 0}"
          @click="${handleClickPrevButton}"
          aria-label="${ifDefined(prevButtonText)}"
          title="${ifDefined(prevButtonText)}"
        >
          ${CaretLeft20()}
        </button>
        ${this._renderStatus()}
        <button
          part="next-button"
          class="${prefix}--btn ${prefix}--btn--secondary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
          ?disabled="${pagesSince <= 1}"
          @click="${handleClickNextButton}"
          aria-label="${ifDefined(nextButtonText)}"
          title="${ifDefined(nextButtonText)}"
        >
          ${CaretRight20()}
        </button>
      </div>
    `;
  }

  /**
   * The CSS custom property name for the live page size.
   * If the CSS custom property is set to `<div class="bx--carousel__scroll-container">`
   * or its ancestor (e.g. the host `<dds-carousel>`), this is set automatically from the CSS custom property.
   */
  static get customPropertyPageSize() {
    return `--${ddsPrefix}--carousel--page-size`;
  }

  static get stableSelector() {
    return `${ddsPrefix}--carousel`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSCarousel;
