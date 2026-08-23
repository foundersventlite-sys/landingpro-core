import React from "react";

import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";

const TEMPLATES = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
};

export default function TemplateRenderer({
  template = 1,
  data = {},
  onOrder,
}) {
  const TemplateComponent =
    TEMPLATES[Number(template)] || Template1;

  return (
    <TemplateComponent
      data={data}
      onOrder={onOrder}
    />
  );
}

export function getTemplate(template) {
  return TEMPLATES[Number(template)] || Template1;
}

export function getAvailableTemplates() {
  return Object.keys(TEMPLATES).map(Number);
}
