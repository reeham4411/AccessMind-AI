/**
 * src/utils/issueMapper.js
 *
 * Maps axe-core rule IDs to plain-English explanations and actionable fixes.
 * This is the static fallback used when no Groq API key is configured.
 * Even with AI enabled, this data is populated first so there is always a value.
 *
 * axe-core rule reference: https://dequeuniversity.com/rules/axe/
 */

const ISSUE_MAP = {
  // ── Images ────────────────────────────────────────────────────────────────
  'image-alt': {
    simpleExplanation:
      'This image has no alternative text. People who are blind and use screen readers will hear nothing when they reach this image, so they will not know what it shows.',
    suggestedFix:
      'Add an alt attribute that describes what the image communicates. Example: <img src="team.jpg" alt="Five team members smiling in the office">. For purely decorative images use alt="" to tell screen readers to skip it.',
  },
  'input-image-alt': {
    simpleExplanation:
      'This image used as a clickable button has no alternative text. Screen reader users do not know what the button does.',
    suggestedFix:
      'Add an alt attribute describing the button action. Example: <input type="image" alt="Search" src="search-icon.png">',
  },
  'image-redundant-alt': {
    simpleExplanation:
      'The image alt text repeats information that is already in nearby text. Screen readers will read it twice, which is confusing.',
    suggestedFix:
      'If the caption already describes the image, use alt="" to make the image invisible to screen readers.',
  },

  // ── Colour & Visual ───────────────────────────────────────────────────────
  'color-contrast': {
    simpleExplanation:
      'The text colour does not contrast enough against the background colour. People with low vision or colour-blindness will struggle to read it.',
    suggestedFix:
      'Increase contrast so normal text meets a 4.5:1 ratio and large text meets 3:1. Use a free tool such as https://webaim.org/resources/contrastchecker/ to verify.',
  },
  'color-contrast-enhanced': {
    simpleExplanation:
      'Text contrast does not meet the stricter AAA standard. While not always required, higher contrast benefits more users.',
    suggestedFix:
      'Aim for a 7:1 contrast ratio for normal text and 4.5:1 for large text to reach WCAG AAA compliance.',
  },

  // ── Forms & Inputs ────────────────────────────────────────────────────────
  'label': {
    simpleExplanation:
      'This form field has no label. A screen reader user cannot tell what information to type into it.',
    suggestedFix:
      'Add a <label> element linked to the input via matching for and id attributes. Example: <label for="email">Email address</label><input id="email" type="email">. Or use aria-label="Email address" on the input itself.',
  },
  'select-name': {
    simpleExplanation:
      'This dropdown menu has no accessible name. Screen reader users cannot tell what they are choosing.',
    suggestedFix:
      'Add a visible label: <label for="country">Country</label><select id="country">...</select>. Or add aria-label="Country" directly on the <select>.',
  },
  'autocomplete-valid': {
    simpleExplanation:
      'The autocomplete attribute on this input has an invalid value. Browsers and assistive tech rely on it to autofill personal information correctly.',
    suggestedFix:
      'Use a valid autocomplete value from the WCAG list, such as "name", "email", "street-address", "postal-code", "tel", etc.',
  },

  // ── Buttons & Links ───────────────────────────────────────────────────────
  'button-name': {
    simpleExplanation:
      'This button has no accessible name. A screen reader user will not know what the button does when they tab to it.',
    suggestedFix:
      'Add visible text inside the button, or use aria-label. Example: <button aria-label="Close dialog">✕</button> or just <button>Submit order</button>.',
  },
  'link-name': {
    simpleExplanation:
      'This link has no accessible name. Screen reader users will not know where the link goes or what it does.',
    suggestedFix:
      'Put descriptive text between the <a> tags. Avoid "click here" — be specific. Example: <a href="/report">Download annual report (PDF)</a>. Or add aria-label to icon-only links.',
  },
  'duplicate-id-active': {
    simpleExplanation:
      'Two or more interactive elements (buttons, inputs, links) share the same id. This breaks keyboard navigation and ARIA associations.',
    suggestedFix:
      'Give every interactive element a unique id. IDs must appear exactly once per page.',
  },

  // ── Document Structure ────────────────────────────────────────────────────
  'document-title': {
    simpleExplanation:
      'This page has no <title>. Screen reader users cannot identify the page from the browser tab, and search engines cannot describe it.',
    suggestedFix:
      'Add a descriptive title inside <head>. Example: <title>Shopping Cart — My Store</title>.',
  },
  'html-has-lang': {
    simpleExplanation:
      'The <html> tag does not declare the page language. Screen readers may use the wrong language voice, making the page hard to understand.',
    suggestedFix:
      'Add a lang attribute to the <html> tag. Example: <html lang="en"> for English, <html lang="es"> for Spanish.',
  },
  'html-lang-valid': {
    simpleExplanation:
      'The lang attribute on <html> contains an invalid language code. Screen readers may not handle it correctly.',
    suggestedFix:
      'Use a valid BCP 47 language tag. Examples: "en", "en-US", "fr", "de", "ar". Full list: https://www.iana.org/assignments/language-subtag-registry',
  },
  'valid-lang': {
    simpleExplanation:
      'A lang attribute somewhere on the page has an invalid value. This can confuse screen readers when switching between languages.',
    suggestedFix:
      'Replace the invalid lang value with a valid BCP 47 language code (e.g. "en", "fr", "zh-Hant").',
  },

  // ── Headings ──────────────────────────────────────────────────────────────
  'heading-order': {
    simpleExplanation:
      'Headings are out of order — for example jumping from H1 straight to H3. Screen reader users navigate pages by headings and a skipped level is confusing.',
    suggestedFix:
      'Use headings in sequence: H1 for the page title, H2 for major sections, H3 for sub-sections. Never skip a level (e.g. H1 → H3).',
  },
  'page-has-heading-one': {
    simpleExplanation:
      'The page has no H1 heading. H1 tells screen reader users and search engines what the page is about.',
    suggestedFix:
      'Add exactly one <h1> that clearly describes the main topic of the page. Example: <h1>Our Products</h1>.',
  },
  'empty-heading': {
    simpleExplanation:
      'A heading element exists but contains no text. Screen readers will announce an empty heading, which is confusing.',
    suggestedFix:
      'Either add meaningful text to the heading, or remove the element entirely if it is not needed.',
  },

  // ── ARIA ──────────────────────────────────────────────────────────────────
  'aria-required-attr': {
    simpleExplanation:
      'An element uses an ARIA role but is missing required ARIA attributes. Without them the assistive technology cannot understand the element.',
    suggestedFix:
      'Add the missing attributes. For example: an element with role="checkbox" must also have aria-checked="true" or aria-checked="false".',
  },
  'aria-valid-attr': {
    simpleExplanation:
      'An ARIA attribute name is not valid. This is usually a typo. Screen readers cannot process unrecognised attributes.',
    suggestedFix:
      'Check the attribute name for typos. All valid ARIA attributes are listed at https://www.w3.org/TR/wai-aria/#state_prop_def.',
  },
  'aria-valid-attr-value': {
    simpleExplanation:
      'An ARIA attribute has an invalid value. Screen readers may interpret the element incorrectly.',
    suggestedFix:
      'Use the correct value for the attribute. For example: aria-expanded must be "true" or "false", aria-hidden must be "true" or "false".',
  },
  'aria-roles': {
    simpleExplanation:
      'An element has an invalid or unknown ARIA role. Screen readers skip or misinterpret elements with bad roles.',
    suggestedFix:
      'Use a valid WAI-ARIA role such as: button, link, navigation, main, dialog, alert, checkbox, listbox, menu, tab. Reference: https://www.w3.org/TR/wai-aria/#role_definitions.',
  },
  'aria-hidden-focus': {
    simpleExplanation:
      'A focusable element is hidden from screen readers via aria-hidden="true". Keyboard users can still tab to it, but screen reader users will get no information about it.',
    suggestedFix:
      'Remove aria-hidden="true" from interactive elements, or prevent them from receiving focus by adding tabindex="-1" and removing them from the tab order.',
  },
  'aria-required-children': {
    simpleExplanation:
      'An ARIA role requires child elements with specific roles, but those children are missing. The widget will not work correctly for assistive technology.',
    suggestedFix:
      'Add the required child roles. For example: a listbox must contain option elements with role="option".',
  },
  'aria-required-parent': {
    simpleExplanation:
      'This element\'s ARIA role requires it to be inside a specific parent element, but it is not. Assistive technology will not understand its purpose.',
    suggestedFix:
      'Place the element inside its required parent. For example: role="option" must be inside role="listbox".',
  },
  'aria-label': {
    simpleExplanation:
      'An element has an empty or missing aria-label. Screen readers announce nothing for this element.',
    suggestedFix:
      'Provide a meaningful aria-label value. Example: <button aria-label="Add item to cart">+</button>.',
  },

  // ── Keyboard & Focus ──────────────────────────────────────────────────────
  'tabindex': {
    simpleExplanation:
      'An element has a positive tabindex (e.g. tabindex="3"). This overrides the natural keyboard tab order, making navigation unpredictable.',
    suggestedFix:
      'Remove positive tabindex values. Use tabindex="0" to make a non-interactive element focusable in natural page order, or tabindex="-1" for programmatic focus only.',
  },
  'scrollable-region-focusable': {
    simpleExplanation:
      'A scrollable area is not reachable by keyboard. Keyboard-only users cannot scroll through its content.',
    suggestedFix:
      'Add tabindex="0" to the scrollable element so keyboard users can focus on it and use arrow keys or Page Up/Down to scroll.',
  },
  'focus-trap': {
    simpleExplanation:
      'Keyboard focus is trapped inside an element, preventing users from navigating away. This is usually a bug.',
    suggestedFix:
      'Ensure that pressing Escape or Tab allows focus to leave the element. Intentional focus traps (like modals) must still have a close mechanism.',
  },

  // ── Iframes ───────────────────────────────────────────────────────────────
  'frame-title': {
    simpleExplanation:
      'An iframe does not have a title. Screen reader users do not know what content is inside it before entering.',
    suggestedFix:
      'Add a title attribute to every iframe. Example: <iframe title="Customer support chat" src="..."></iframe>.',
  },
  'frame-focusable-content': {
    simpleExplanation:
      'An iframe contains focusable elements but the frame itself has no title. Screen readers cannot announce what users are entering.',
    suggestedFix:
      'Add a descriptive title attribute to the <iframe> tag.',
  },

  // ── Tables ────────────────────────────────────────────────────────────────
  'td-headers-attr': {
    simpleExplanation:
      'A table cell references header IDs that do not exist. Screen readers cannot associate data cells with their column/row headers.',
    suggestedFix:
      'Make sure every ID listed in a headers attribute matches an actual <th id="..."> on the page.',
  },
  'th-has-data-cells': {
    simpleExplanation:
      'A table header cell does not correspond to any data cells. Screen readers may announce misleading structure.',
    suggestedFix:
      'Review the table structure to ensure every <th> is associated with <td> elements either via scope or headers attributes.',
  },
  'scope-attr-valid': {
    simpleExplanation:
      'A table header\'s scope attribute has an invalid value. Screen readers use scope to associate headers with data cells.',
    suggestedFix:
      'Use a valid scope value: "col" for column headers, "row" for row headers, "colgroup" or "rowgroup" for spanning headers.',
  },

  // ── Lists ─────────────────────────────────────────────────────────────────
  'list': {
    simpleExplanation:
      'A list element (<ul> or <ol>) contains elements that are not <li> items. This breaks the semantic structure that screen readers rely on.',
    suggestedFix:
      'Only put <li> elements directly inside <ul> or <ol>. Other elements should be placed outside the list or nested inside an <li>.',
  },
  'listitem': {
    simpleExplanation:
      'A list item (<li>) is used outside of a <ul> or <ol>. Screen readers expect list items to always be inside a list.',
    suggestedFix:
      'Wrap all <li> elements inside a <ul> or <ol> parent. Example: <ul><li>First item</li><li>Second item</li></ul>.',
  },

  // ── Navigation & Landmarks ────────────────────────────────────────────────
  'landmark-one-main': {
    simpleExplanation:
      'The page has no main landmark. Screen reader users rely on landmarks to jump directly to the primary content.',
    suggestedFix:
      'Wrap the main content of the page in a <main> element. Example: <main id="main-content">...</main>.',
  },
  'region': {
    simpleExplanation:
      'Some page content is not inside any landmark region. Screen reader users who navigate by landmarks will miss this content.',
    suggestedFix:
      'Wrap all content in appropriate landmark elements: <header>, <nav>, <main>, <aside>, <footer>, or <section aria-label="...">.',
  },
  'landmark-no-duplicate-banner': {
    simpleExplanation:
      'The page has more than one banner landmark. Screen readers can only present one banner, which confuses navigation.',
    suggestedFix:
      'Use only one <header> element (or role="banner") at the top-level of the page. Headers inside <article> or <section> elements are fine.',
  },
  'landmark-no-duplicate-contentinfo': {
    simpleExplanation:
      'There are multiple footer/contentinfo landmarks. Screen reader navigation menus will show duplicates.',
    suggestedFix:
      'Have only one top-level <footer> (or role="contentinfo") per page.',
  },
  'skip-link': {
    simpleExplanation:
      'The page has no skip navigation link. Keyboard users must tab through every navigation item on every page before reaching the main content.',
    suggestedFix:
      'Add a visually-hidden skip link as the very first element: <a href="#main-content" class="skip-link">Skip to main content</a>. Make it visible on focus.',
  },

  // ── Viewport & Zoom ───────────────────────────────────────────────────────
  'meta-viewport': {
    simpleExplanation:
      'The viewport meta tag prevents users from zooming in. People with low vision need to zoom to read text.',
    suggestedFix:
      'Remove user-scalable=no and any maximum-scale below 2 from your viewport meta tag. Use: <meta name="viewport" content="width=device-width, initial-scale=1">.',
  },

  // ── IDs & Duplicates ──────────────────────────────────────────────────────
  'duplicate-id': {
    simpleExplanation:
      'Two or more elements share the same id attribute. ARIA labels and form associations that rely on unique IDs will break.',
    suggestedFix:
      'Make every id attribute on the page unique. IDs are identifiers and must only appear once.',
  },

  // ── Media ─────────────────────────────────────────────────────────────────
  'video-caption': {
    simpleExplanation:
      'A video element has no captions. Deaf users and people in noisy environments cannot follow the audio.',
    suggestedFix:
      'Add a <track kind="captions"> element inside the <video> tag. Alternatively use an external captioning service and embed the result.',
  },
  'audio-caption': {
    simpleExplanation:
      'An audio element has no transcript or captions. Deaf users cannot access this content.',
    suggestedFix:
      'Provide a text transcript next to the audio player, or add synchronised captions via a <track> element.',
  },

  // ── Access Keys ───────────────────────────────────────────────────────────
  'accesskeys': {
    simpleExplanation:
      'Duplicate accesskey shortcut values exist on the page. When two elements share the same accesskey, browsers behave inconsistently.',
    suggestedFix:
      'Ensure all accesskey attributes are unique across the page, or remove accesskeys entirely — they often conflict with screen reader and OS shortcuts.',
  },
};

/**
 * Default used when we do not have a specific mapping for a rule.
 */
const DEFAULT_ISSUE_INFO = {
  simpleExplanation:
    'This element has an accessibility issue that may prevent some users from understanding or interacting with it.',
  suggestedFix:
    'Review the element against WCAG 2.1 AA guidelines. Ensure it has an accessible name, is keyboard-operable, and conveys the correct semantic meaning to screen readers.',
};

/**
 * Look up plain-English info for an axe-core rule ID.
 *
 * @param {string} ruleId  - axe-core violation id, e.g. "image-alt"
 * @returns {{ simpleExplanation: string, suggestedFix: string }}
 */
function getIssueInfo(ruleId) {
  // Exact match
  if (ISSUE_MAP[ruleId]) return ISSUE_MAP[ruleId];

  // Partial match (e.g. "aria-labelledby-region" → "aria-label")
  for (const key of Object.keys(ISSUE_MAP)) {
    if (ruleId.startsWith(key) || key.startsWith(ruleId)) {
      return ISSUE_MAP[key];
    }
  }

  return DEFAULT_ISSUE_INFO;
}

module.exports = { getIssueInfo };
