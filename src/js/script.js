/* global Handlebars */

{
  'use strict';

  const select = {
    templateOf: {
      general: '#template-general',
      links: '#template-links',
      banners: '#template-banners',
      personalData: '#template-personaldata',
    },
    containerOf: {
      pages: '.pages',
      general: '.general-wrapper',
      links: '.links-wrapper',
      banners: '.banners-wrapper',
      personalData: '.personaldata-wrapper',
    },
    navLinks: '.comp--navigation a',
    collapsingButton: '.collapsing-button',
    collapsingElements: '.collapsing',
  };

  const classNames = {
    active: 'active',
    collapsed: 'collapsed',
    extended: 'extended',
  };

  const templates = {
    general: Handlebars.compile(document.querySelector(select.templateOf.general).innerHTML),
    links: Handlebars.compile(document.querySelector(select.templateOf.links).innerHTML),
    banners: Handlebars.compile(document.querySelector(select.templateOf.banners).innerHTML),
    personalData: Handlebars.compile(document.querySelector(select.templateOf.personalData).innerHTML),
  };


  class Panel {

    constructor(){
      const thisPanel = this;

      thisPanel.getElements();
      thisPanel.initPages();
      thisPanel.initViews();
      thisPanel.initWidgets();
    }

    getElements(){
      const thisPanel = this;

      thisPanel.dom = {};
      thisPanel.dom.collapsingButton = document.querySelector(select.collapsingButton);
      thisPanel.dom.collapsingElements = document.querySelectorAll(select.collapsingElements);
      thisPanel.dom.extendingElement = document.querySelector(select.containerOf.pages);
    }

    initViews(){
      const thisPanel = this;

      const generatedHTMLOf = {
        general: templates.general(),
        links: templates.links(),
        banners: templates.banners(),
        personalData: templates.personalData(),
      };

      thisPanel.dom.generalWrapper = document.querySelector(select.containerOf.general);
      thisPanel.dom.generalWrapper.innerHTML = generatedHTMLOf.general;

      thisPanel.dom.linksWrapper = document.querySelector(select.containerOf.links);
      thisPanel.dom.linksWrapper.innerHTML = generatedHTMLOf.links;

      thisPanel.dom.bannersWrapper = document.querySelector(select.containerOf.banners);
      thisPanel.dom.bannersWrapper.innerHTML = generatedHTMLOf.banners;

      thisPanel.dom.personalDataWrapper = document.querySelector(select.containerOf.personalData);
      thisPanel.dom.personalDataWrapper.innerHTML = generatedHTMLOf.personalData;
    }

    initWidgets(){
      const thisPanel = this;

      const screenWidth = window.innerWidth;

      if (screenWidth <= 767){
        for (const collapsingElement of thisPanel.dom.collapsingElements){
          collapsingElement.classList.add(classNames.collapsed);
        }
        thisPanel.dom.extendingElement.classList.add(classNames.extended);

        for (let link of thisPanel.navLinks) {
          link.addEventListener('click', function(){
            for (const collapsingElement of thisPanel.dom.collapsingElements){
              collapsingElement.classList.add(classNames.collapsed);
            }
            thisPanel.dom.extendingElement.classList.add(classNames.extended);
          });
        }
      }

      thisPanel.dom.collapsingButton.addEventListener('click', function(){
        for (const collapsingElement of thisPanel.dom.collapsingElements){
          collapsingElement.classList.toggle(classNames.collapsed);
        }
        thisPanel.dom.extendingElement.classList.toggle(classNames.extended);
      });
    }

    initPages(){
      const thisPanel = this;

      thisPanel.pages = document.querySelector(select.containerOf.pages).children;
      thisPanel.navLinks = document.querySelectorAll(select.navLinks);

      const idFromHash = window.location.hash.replace('#', '');

      let pageMatchingHash = thisPanel.pages[0].id;

      for (let page of thisPanel.pages) {
        if (page.id == idFromHash) {
          pageMatchingHash = page.id;
          break;
        }
      }

      thisPanel.activatePage(pageMatchingHash);

      for (let link of thisPanel.navLinks) {
        link.addEventListener('click', function(event){
          const clickedElement = this;
          event.preventDefault();

          const pageId = clickedElement.getAttribute('href').replace('#', '');

          thisPanel.activatePage(pageId);

          window.location.hash = '#' + pageId;
        });
      }
    }

    activatePage(pageId){
      const thisPanel = this;

      for (let page of thisPanel.pages) {
        page.classList.toggle(
          classNames.active,
          page.id == pageId
        );
      }

      for (let link of thisPanel.navLinks) {
        link.classList.toggle(
          classNames.active,
          link.getAttribute('href') == '#' + pageId
        );
      }
    }
  }

  new Panel();
}
