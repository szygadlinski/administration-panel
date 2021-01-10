{
  'use strict';

  const select = {
    collapsingButton: '.collapsing-button',
    collapsingElements: '.collapsing',
    extendingElements: '.extending',
  };

  const classNames = {
    collapsed: 'collapsed',
    extended: 'extended',
  };

  class Buttons {

    constructor(){
      const thisButtons = this;

      thisButtons.getElements();
      thisButtons.initButtons();
    }

    getElements(){
      const thisButtons = this;

      thisButtons.dom = {};
      thisButtons.dom.collapsingButton = document.querySelector(select.collapsingButton);
      thisButtons.dom.collapsingElements = document.querySelectorAll(select.collapsingElements);
      thisButtons.dom.extendingElements = document.querySelectorAll(select.extendingElements);
    }

    initButtons(){
      const thisButtons = this;

      const screenWidth = window.innerWidth;

      if (screenWidth <= 767){
        for (const collapsingElement of thisButtons.dom.collapsingElements){
          collapsingElement.classList.add(classNames.collapsed);
        }
        for (const extendingElement of thisButtons.dom.extendingElements){
          extendingElement.classList.add(classNames.extended);
        }
      }

      thisButtons.dom.collapsingButton.addEventListener('click', function(){
        for (const collapsingElement of thisButtons.dom.collapsingElements){
          collapsingElement.classList.toggle(classNames.collapsed);
        }
        for (const extendingElement of thisButtons.dom.extendingElements){
          extendingElement.classList.toggle(classNames.extended);
        }
      });
    }
  }

  new Buttons();
}
