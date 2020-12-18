
class Paragraph {
/*
Default placeholder for Paragraph Tool
@return {string}
@constructor
*/
static get DEFAULT_PLACEHOLDER() {
return ''
}
/**

Render plugin`s main Element and fill it with saved data
@param {object} params - constructor params
@param {ParagraphData} params.data - previously saved data
@param {ParagraphConfig} params.config - user config for Tool
@param {object} params.api - editor.js api
*/
constructor({ data, config, api }) {
this.api = api
this._CSS = {
  block: this.api.styles.block,
  wrapper: 'ce-paragraph',
}
this.CSS = {
  baseClass: this.api.styles.block,
  loading: this.api.styles.loader,
  input: this.api.styles.input,
  settingsButton: this.api.styles.settingsButton,
  settingsButtonActive: this.api.styles.settingsButtonActive,

  /**
   * Tool's classes
   */
  imageHolder: 'utd-image__picture',
  caption: 'utd-image__caption',
  link: 'utd-image__link',
}

this.onKeyUp = this.onKeyUp.bind(this)

/**
 * Placeholder for paragraph if it is first Block
 * @type {string}
 */
this._placeholder = config.placeholder ? config.placeholder : Paragraph.DEFAULT_PLACEHOLDER
this._data = {}
this._element = this.drawView(data)
this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false

this.data = data

this.settings = [
  {
    name: 'text-left',
    icon: `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M1.683,3.39h16.676C18.713,3.39,19,3.103,19,2.749s-0.287-0.642-0.642-0.642H1.683
    c-0.354,0-0.641,0.287-0.641,0.642S1.328,3.39,1.683,3.39z M1.683,7.879h11.545c0.354,0,0.642-0.287,0.642-0.641
    s-0.287-0.642-0.642-0.642H1.683c-0.354,0-0.641,0.287-0.641,0.642S1.328,7.879,1.683,7.879z M18.358,11.087H1.683
    c-0.354,0-0.641,0.286-0.641,0.641s0.287,0.642,0.641,0.642h16.676c0.354,0,0.642-0.287,0.642-0.642S18.713,11.087,18.358,11.087z
     M11.304,15.576H1.683c-0.354,0-0.641,0.287-0.641,0.642s0.287,0.641,0.641,0.641h9.621c0.354,0,0.642-0.286,0.642-0.641
    S11.657,15.576,11.304,15.576z"></path>
      </svg>`,
  },
  {
    name: 'text-center',
    icon: `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M1.686,3.327h16.754c0.356,0,0.645-0.288,0.645-0.644c0-0.356-0.288-0.645-0.645-0.645H1.686
        c-0.356,0-0.644,0.288-0.644,0.645C1.042,3.039,1.33,3.327,1.686,3.327z M4.263,6.549c-0.356,0-0.644,0.288-0.644,0.645
        c0,0.356,0.288,0.644,0.644,0.644h11.599c0.356,0,0.645-0.288,0.645-0.644c0-0.356-0.288-0.645-0.645-0.645H4.263z M18.439,11.06
        H1.686c-0.356,0-0.644,0.288-0.644,0.644c0,0.356,0.288,0.645,0.644,0.645h16.754c0.356,0,0.645-0.288,0.645-0.645
        C19.084,11.348,18.796,11.06,18.439,11.06z M15.218,15.57H5.552c-0.356,0-0.645,0.288-0.645,0.645c0,0.355,0.289,0.644,0.645,0.644
        h9.666c0.355,0,0.645-0.288,0.645-0.644C15.862,15.858,15.573,15.57,15.218,15.57z"></path>
</svg>`,
  },
  {
    name: 'text-right',
    icon: `<svg class="svg-icon" viewBox="0 0 20 20">
    <path fill="none" d="M1.321,3.417h17.024C18.707,3.417,19,3.124,19,2.762c0-0.362-0.293-0.655-0.654-0.655H1.321
        c-0.362,0-0.655,0.293-0.655,0.655C0.667,3.124,0.959,3.417,1.321,3.417z M18.346,15.857H8.523c-0.361,0-0.655,0.293-0.655,0.654
        c0,0.362,0.293,0.655,0.655,0.655h9.822c0.361,0,0.654-0.293,0.654-0.655C19,16.15,18.707,15.857,18.346,15.857z M18.346,11.274
        H1.321c-0.362,0-0.655,0.292-0.655,0.654s0.292,0.654,0.655,0.654h17.024c0.361,0,0.654-0.292,0.654-0.654
        S18.707,11.274,18.346,11.274z M18.346,6.69H6.56c-0.362,0-0.655,0.293-0.655,0.655C5.904,7.708,6.198,8,6.56,8h11.786
        C18.707,8,19,7.708,19,7.345C19,6.983,18.707,6.69,18.346,6.69z"></path>
</svg>`,
  },
]
}

renderSettings() {
let wrapper = document.createElement('div')

this.settings.forEach(tune => {
  let el = document.createElement('div')

  el.classList.add(this.CSS.settingsButton)
  el.innerHTML = tune.icon

  el.addEventListener('click', () => {
    this._toggleTune(tune.name)
  })

  el.classList.toggle(!this.CSS.settingsButtonActive, this.data[tune.name])
  wrapper.appendChild(el)
})
return wrapper
}

/**

Check if text content is empty and set empty string to inner html.
We need this because some browsers (e.g. Safari) insert
into empty contenteditanle elements
@param {KeyboardEvent} e - key up event
*/
onKeyUp(e) {
if (e.code !== 'Backspace' && e.code !== 'Delete') {
return
}
const { textContent } = this._element

if (textContent === '') {
  this._element.innerHTML = ''
}
}

/**

Create Tool's view
@return {HTMLElement}
@Private
*/
drawView(data) {
let c = data.class ? data.class : ''
let div = document.createElement('DIV')
div.classList.add(this._CSS.wrapper, this._CSS.block)
if (c) {
div.classList.add(c)
}
div.contentEditable = true
div.dataset.placeholder = this.api.i18n.t(this._placeholder)

div.addEventListener('keyup', this.onKeyUp)

return div
}

/**

Return Tool's view
@returns {HTMLDivElement}
@public
*/
render() {
return this._element
}
/**

Method that specified how to merge two Text blocks.
Called by Editor.js by backspace at the beginning of the Block
@param {ParagraphData} data
@public
*/
merge(data) {
let newData = {
text: this.data.text + data.text,
class: this.data.class,
}
this.data = newData
}

/**

Validate Paragraph block data:
check for emptiness
@param {ParagraphData} savedData — data received after saving
@returns {boolean} false if saved data is not correct, otherwise true
@public
*/
validate(savedData) {
if (savedData.text.trim() === '' && !this._preserveBlank) {
return false
}
return true
}

/**

Extract Tool's data from the view
@param {HTMLDivElement} toolsContent - Paragraph tools rendered view
@returns {ParagraphData} - saved data
@public
*/
save(toolsContent) {
return {
text: toolsContent.innerHTML,
class: toolsContent.classList[2],
}
}
/**

On paste callback fired from Editor.
@param {PasteEvent} event - event with pasted data
*/
onPaste(event) {
const data = {
text: event.detail.data.innerHTML,
}
this.data = data
}

/**

Enable Conversion Toolbar. Paragraph can be converted to/from other tools
*/
static get conversionConfig() {
return {
export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
import: 'text', // to covert other block's exported string to Paragraph, fill 'text' property of tool data
}
}
/**

Sanitizer rules
*/
static get sanitize() {
return {
text: {
br: true,
},
}
}
/**

Get current Tools`s data
@returns {ParagraphData} Current data
@Private
*/
get data() {
let text = this._element.innerHTML
let c = this._element.classList
this._data.text = text
this._data.class = c[2]

return this._data
}

/**

Store data in plugin:
at the this._data property
at the HTML
@param {ParagraphData} data — data to set
@Private
*/
set data(data) {
this._data = data || {}
this._element.innerHTML = this._data.text || ''
// this._element.classList = this._data.class
}

/**

Used by Editor paste handling API.
Provides configuration to handle P tags.
@returns {{tags: string[]}}
*/
static get pasteConfig() {
return {
tags: ['P'],
}
}


//Click on the Settings Button
//@Private

_toggleTune(tune) {
this.data[tune] = !this.data[tune]
this._element.classList = `${this._CSS.wrapper} ${this._CSS.block} ${tune}`
}

//Icon and title for displaying at the Toolbox
//@return {{icon: string, title: string}}

static get toolbox() {
return {
icon: '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>',
//this.button.innerHTML = '<svg width="20" height="18"><path d="M15.414 0.586c-0.781-0.781-2.047-0.781-2.828 0l-2.689 2.689-1.896-1.896-2.121 2.121 1.663 1.663-7.377 7.377c-0.126 0.126-0.179 0.296-0.161 0.46h-0.004v2.5c0 0.276 0.224 0.5 0.5 0.5h2.5c0 0 0.042 0 0.063 0 0.144 0 0.288-0.055 0.398-0.165l7.377-7.377 1.663 1.663 2.121-2.121-1.896-1.896 2.689-2.689c0.781-0.781 0.781-2.047 0-2.828zM2.705 15h-1.705v-1.705l7.337-7.337 1.704 1.704-7.337 7.337z"/></svg>,
title: 'Text',
}
}
}
export default Paragraph