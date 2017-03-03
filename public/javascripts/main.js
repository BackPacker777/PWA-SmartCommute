//   @todo

"use strict";

class main {
     constructor() {
          main.prepApp();
          new EventHandler();
          this.user = [];
     }

     static prepApp() {
          document.getElementById('log').style.display = 'none';
          document.getElementById('create').style.display = 'none';
     }
}

class EventHandler {
     constructor() {
          this.handleFB();
          this.handleContinue();
          this.handleCreate();
          this.handleSubmit();
     }

     handleFB() {
          document.getElementById('fb').addEventListener('click', () => {
               document.getElementById('login').style.display = 'none';
               document.getElementById('log').style.display = 'block';
          });
     }

     handleContinue() {
          document.getElementById('continue').addEventListener('click', () => {
               if (document.getElementById('email').value === '' || ! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('email').value)) {
                    EventHandler.alertId();
               } else {
                    this.performAjax('XMLHttpRequest0', [document.getElementById('email').value, document.getElementById('password').value], (response) => {
                         if (response === 'false') {
                              EventHandler.alertId();
                         } else {
                              this.user = JSON.parse(response);
                              document.getElementById('login').style.display = 'none';
                              document.getElementById('log').style.display = 'block';
                              console.log(this.user.firstName);
                              if (Object.prototype.toString.call(this.user) === '[object Object]') {
                                   document.getElementById('name').innerHTML = `${this.user.firstName} ${this.user.lastName}`;
                              } else {
                                   document.getElementById('name').innerHTML = `${this.user[0].firstName} ${this.user[0].lastName}`;
                              }
                         }
                    });
               }
          });
     }

     handleCreate() {
          document.getElementById('creator').addEventListener('click', () => {
               document.getElementById('login').style.display = 'none';
               document.getElementById('create').style.display = 'block';
          });
     }

     handleSubmit() {
          document.getElementById('submit').addEventListener('click', () => {
               if (document.getElementById('createEmail').value !== 'undefined' && /^[a-z0-9]{1,20}$/i.test(document.getElementById('createPassword').value)) {
                    if (document.getElementById('createPassword').value === document.getElementById('confirmPassword').value) {
                         let data = new FormData(document.querySelector('#createAccount'));
                         this.performAjax('XMLHttpRequest1', data, (response) => {
                              let meow = JSON.parse(response);
                              console.log(meow);
                              // this.updateEvents();
                         });
                    } else {
                         alert(`Passwords don't match, please try again.`);
                    }
               } else {
                    alert(`Please fill in all data.`);
               }
          });
     }

     static alertId() {
          alert('You must provide your proper email address to continue.');
     }

     performAjax(requestNum, sendToNode, callback) {
          let bustCache = '?' + new Date().getTime();
          const XHR = new XMLHttpRequest();
          XHR.open('POST', document.url  + bustCache, true);
          XHR.setRequestHeader('X-Requested-with', requestNum);
          XHR.send(sendToNode);
          XHR.onload = () => {
               if (XHR.readyState == 4 && XHR.status == 200) {
                    return callback(XHR.responseText);
               }
          };
     }
}

window.addEventListener('load', () => {
     new main();
});