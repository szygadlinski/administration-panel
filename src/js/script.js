/* global Handlebars, Chart */

{
  'use strict';

  const select = {
    templateOf: {
      general: '#template-general',
      details: '#template-details',
      links: '#template-links',
      banners: '#template-banners',
      personalData: '#template-personaldata',
      payout: '#template-payout',
    },
    containerOf: {
      pages: '.pages',
      general: '.general-wrapper',
      details: '.details-wrapper',
      links: '.links-wrapper',
      banners: '.banners-wrapper',
      personalData: '.personaldata-wrapper',
      payout: '.payout-wrapper',
      chart: 'myChart',
    },
    navLinks: '.comp--navigation a',
    collapsingButton: '.collapsing-button',
    collapsingElements: '.collapsing',
    passwordInputs: '.password',
    modals: {
      all: '.modal',
      quitModal: '.quit-modal',
      loginModal: '.login-modal',
      chatModal: '.chat-modal',
      overlay: '.overlay',
      close: '.js--close-modal',
      open: {
        logout: '.logout',
        user: '.user',
        manager: '.manager-contact',
      }
    }
  };

  const classNames = {
    active: 'active',
    collapsed: 'collapsed',
    extended: 'extended',
    show: 'show',
    passwordValidation: 'is-valid',
  };

  const templates = {
    general: Handlebars.compile(document.querySelector(select.templateOf.general).innerHTML),
    details: Handlebars.compile(document.querySelector(select.templateOf.details).innerHTML),
    links: Handlebars.compile(document.querySelector(select.templateOf.links).innerHTML),
    banners: Handlebars.compile(document.querySelector(select.templateOf.banners).innerHTML),
    personalData: Handlebars.compile(document.querySelector(select.templateOf.personalData).innerHTML),
    payout: Handlebars.compile(document.querySelector(select.templateOf.payout).innerHTML),
  };


  class Panel {

    constructor(){
      const thisPanel = this;

      thisPanel.getElements();
      thisPanel.initPages();
      thisPanel.initViews();
      thisPanel.initWidgets();
      thisPanel.initChart();
      thisPanel.initModals();
    }

    getElements(){
      const thisPanel = this;

      thisPanel.dom = {};
      thisPanel.dom.collapsingButton = document.querySelector(select.collapsingButton);
      thisPanel.dom.collapsingElements = document.querySelectorAll(select.collapsingElements);
      thisPanel.dom.extendingElement = document.querySelector(select.containerOf.pages);

      thisPanel.dom.modalsOverlay = document.querySelector(select.modals.overlay);
      thisPanel.dom.closeModals = document.querySelectorAll(select.modals.close);

      thisPanel.dom.modals = document.querySelectorAll(select.modals.all);
      thisPanel.dom.quitModal = document.querySelector(select.modals.quitModal);
      thisPanel.dom.loginModal = document.querySelector(select.modals.loginModal);
      thisPanel.dom.chatModal = document.querySelector(select.modals.chatModal);

      thisPanel.dom.logoutButton = document.querySelector(select.modals.open.logout);
      thisPanel.dom.userButton = document.querySelector(select.modals.open.user);
      thisPanel.dom.managerButton = document.querySelector(select.modals.open.manager);
    }

    initViews(){
      const thisPanel = this;

      const generatedHTMLOf = {
        general: templates.general(),
        details: templates.details(),
        links: templates.links(),
        banners: templates.banners(),
        personalData: templates.personalData(),
        payout: templates.payout(),
      };

      thisPanel.dom.generalWrapper = document.querySelector(select.containerOf.general);
      thisPanel.dom.generalWrapper.innerHTML = generatedHTMLOf.general;

      thisPanel.dom.detailsWrapper = document.querySelector(select.containerOf.details);
      thisPanel.dom.detailsWrapper.innerHTML = generatedHTMLOf.details;

      thisPanel.dom.linksWrapper = document.querySelector(select.containerOf.links);
      thisPanel.dom.linksWrapper.innerHTML = generatedHTMLOf.links;

      thisPanel.dom.bannersWrapper = document.querySelector(select.containerOf.banners);
      thisPanel.dom.bannersWrapper.innerHTML = generatedHTMLOf.banners;

      thisPanel.dom.personalDataWrapper = document.querySelector(select.containerOf.personalData);
      thisPanel.dom.personalDataWrapper.innerHTML = generatedHTMLOf.personalData;

      thisPanel.dom.payoutWrapper = document.querySelector(select.containerOf.payout);
      thisPanel.dom.payoutWrapper.innerHTML = generatedHTMLOf.payout;
    }

    initWidgets(){
      const thisPanel = this;

      const isMobile = window.innerWidth <= 767;
      let isMenuClicked = false;

      const toggleClasses = function(isExtended){
        for (const collapsingElement of thisPanel.dom.collapsingElements){
          collapsingElement.classList.toggle(classNames.collapsed, isExtended);
        }
        thisPanel.dom.extendingElement.classList.toggle(classNames.extended, isExtended);
      };

      for (let link of thisPanel.navLinks) {
        link.addEventListener('click', function(){
          if (isMobile){
            toggleClasses(true);
          }
        });
      }

      if (isMobile){
        toggleClasses(true);
      }

      thisPanel.dom.collapsingButton.addEventListener('click', function(){
        toggleClasses(isMenuClicked);
        isMenuClicked = !isMenuClicked;
      });

      window.addEventListener('resize', function(){
        toggleClasses(isMobile);
      });

      toggleClasses(window.innerWidth <= 767);

      thisPanel.dom.passwordInputs = document.querySelectorAll(select.passwordInputs);

      for (let passwordInput of thisPanel.dom.passwordInputs) {
        passwordInput.addEventListener('input', function(event){
          event.preventDefault();
          passwordInput.classList.add(classNames.passwordValidation);
        });
      }
    }

    initChart(){
      let ctx = document.getElementById(select.containerOf.chart).getContext('2d');

      Chart.defaults.global.defaultFontColor = '#636363';
      Chart.defaults.global.defaultFontFamily = '"Open Sans", Helvetica, Arial';

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
          datasets: [{
            label: 'Signups',
            backgroundColor: '#56819f',
            borderColor: '#56819f',
            fontSize: '20px',
            data: [52, 51, 41, 94, 26, 6, 72, 9, 21, 88],
          },
          {
            label: 'FTD',
            backgroundColor: '#f58220',
            borderColor: '#f58220',
            data: [6, 72, 1, 0, 47, 11, 50, 44, 63, 76],
          },
          {
            label: 'Earned',
            backgroundColor: '#04ae00',
            borderColor: '#04ae00',
            data: [59, 49, 68, 90, 67, 41, 13, 38, 48, 48],
            hidden: true,
          }],
        },
      });
    }

    initModals(){
      const thisPanel = this;

      thisPanel.dom.closeModals.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
          event.preventDefault();
          thisPanel.closeModal();
        });
      });

      thisPanel.dom.modalsOverlay.addEventListener('click', function(event) {
        if (event.target === this) {
          thisPanel.closeModal();
        }
      });

      document.addEventListener('keyup', function(event) {
        if (event.keyCode === 27) {
          thisPanel.closeModal();
        }
      });

      thisPanel.dom.logoutButton.addEventListener('click', function(){
        thisPanel.openModal(select.modals.quitModal);
      });

      thisPanel.dom.userButton.addEventListener('click', function(){
        thisPanel.openModal(select.modals.loginModal);
      });

      thisPanel.dom.managerButton.addEventListener('click', function(){
        thisPanel.openModal(select.modals.chatModal);
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

    closeModal(){
      const thisPanel = this;

      thisPanel.dom.modalsOverlay.classList.remove(classNames.show);
    }

    openModal(modal){
      const thisPanel = this;

      thisPanel.dom.modals.forEach(function(modal) {
        modal.classList.remove(classNames.show);
      });

      thisPanel.dom.modalsOverlay.classList.add(classNames.show);

      document.querySelector(modal).classList.add(classNames.show);
    }
  }

  new Panel();
}
