
import React from 'react'

class Markme {
    static get isInline() {
        return true;
      }
    
      get state() {
        return this._state;
      }
    
      set state(state) {
        this._state = state;
    
        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state);
      }
    
      constructor({api}) {
        console.log("My API",api)
        this.api = api;
        this.button = null;
        this._state = false;
        this.tag = 'MARK';
        this.class = 'cdx-marker';
      }
    
      render() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.innerHTML = '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
        //this.button.innerHTML = '<svg width="20" height="18"><path d="M15.414 0.586c-0.781-0.781-2.047-0.781-2.828 0l-2.689 2.689-1.896-1.896-2.121 2.121 1.663 1.663-7.377 7.377c-0.126 0.126-0.179 0.296-0.161 0.46h-0.004v2.5c0 0.276 0.224 0.5 0.5 0.5h2.5c0 0 0.042 0 0.063 0 0.144 0 0.288-0.055 0.398-0.165l7.377-7.377 1.663 1.663 2.121-2.121-1.896-1.896 2.689-2.689c0.781-0.781 0.781-2.047 0-2.828zM2.705 15h-1.705v-1.705l7.337-7.337 1.704 1.704-7.337 7.337z"/></svg>';
        this.button.classList.add(this.api.styles.inlineToolButton);
        return this.button;
      }
    
      surround(range) {
        if (this.state) {
          this.unwrap(range);
          return;
        }
    
        this.wrap(range);
      }
    
      wrap(range) {
        const selectedText = range.extractContents();
        console.log("range",document.getElementById(selectedText))
        const mark = document.createElement(this.tag);
    
        mark.classList.add(this.class);
        mark.appendChild(selectedText);
        range.insertNode(mark);
    
        this.api.selection.expandToTag(mark);
      }
    
      unwrap(range) {
        const mark = this.api.selection.findParentTag(this.tag, this.class);
        const text = range.extractContents();
    
        mark.remove();
    
        range.insertNode(text);
      }
    
    
      checkState() {
        const mark = this.api.selection.findParentTag(this.tag);
    
        this.state = !!mark;
      }
}


export default Markme