/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./styles.scss";

import ArrowRight20 from "@carbon/icons-react/es/arrow--right/20";
import { Card } from "@carbon/ibmdotcom-react";
import React from "react";
import ReactDom from "react-dom";

const card = {
  eyebrow: "eyebrow text",
  heading: "Lorem ipsum dolor sit amet",
};

const ctaStatic = {
  type: "local",
  copy: "click here",
  href: "https://example.com",
  icon: {
    src: ArrowRight20,
  },
};

const ctaLink = {
  type: "local",
  href: "https://example.com",
  icon: {
    src: ArrowRight20,
  },
};

const App = () => (
  <div className="bx--grid">
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-6">
        <h4>Static</h4>
        <Card cta={ctaStatic} {...card} type="static" />
      </div>
    </div>
    <div className="bx--row">
      <div className="bx--col-sm-4 bx--col-lg-6">
        <h4>Link</h4>
        <Card cta={ctaLink} {...card} type="link" />
      </div>
    </div>
  </div>
);

ReactDom.render(<App />, document.getElementById("app"));
