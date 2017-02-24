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
                    this.performAjax('XMLHttpRequest0', document.getElementById('email').value, (response) => {
                         if (response === 'false') {
                              EventHandler.alertId();
                         } else {
                              console.log('\nYAY!');
                              this.user = JSON.parse(response);
                              document.getElementById('login').style.display = 'none';
                              document.getElementById('log').style.display = 'block';
                              if (Object.prototype.toString.call(this.user) === '[object Array]') {
                                   document.getElementById('name').innerHTML = `${this.user[0].firstName} ${this.user[0].lastName}`;
                              } else {
                                   document.getElementById('name').innerHTML = `${this.user.firstName} ${this.user.lastName}`;
                              }
                         }
                    });
               } /*else {
                              this.user = JSON.parse(response);
                              document.getElementById('top').style.display = 'none';
                              document.getElementById('logEntry').style.display = 'block';
                              if (Object.prototype.toString.call(this.coach) === '[object Array]') {
                                   document.getElementById('coachName').innerHTML = `${this.coach[0].firstName} ${this.coach[0].lastName}`;
                                   document.getElementById('coachID').value = this.coach[0].coachID;
                                   document.getElementById('lastName').value = this.coach[0].lastName;
                                   document.getElementById('firstName').value = this.coach[0].firstName;
                                   this.updateEvents();
                              } else {
                                   document.getElementById('coachName').innerHTML = `${this.coach.firstName} ${this.coach.lastName}`;
                                   document.getElementById('coachID').value = this.coach.coachID;
                                   document.getElementById('lastName').value = this.coach.lastName;
                                   document.getElementById('firstName').value = this.coach.firstName;
                              }
                         }
                    });
               }*/
          });
     }

     handleCreate() {
          document.getElementById('creator').addEventListener('click', () => {
               document.getElementById('login').style.display = 'none';
               document.getElementById('create').style.display = 'block';
          });
     }

     handleSubmit() {
          document.getElementById('coachingData').addEventListener('submit', (event) => {
               event.preventDefault();
               if (document.getElementById('eventDate').validity.valid && document.getElementById('eventName').validity.valid) {
                    let fieldValues = [];
                    fieldValues[0] = document.getElementById('eventDate').value;
                    fieldValues[1] = document.getElementById('eventNumber').value;
                    fieldValues[2] = document.getElementById('eventName').value;
                    if (this.validate(fieldValues) === true) {
                         let data = new FormData(document.querySelector('#coachingData'));
                         this.performAjax('XMLHttpRequest1', data, (response) => {
                              this.coach = JSON.parse(response);
                              this.updateEvents();
                         });
                         document.getElementById('eventDate').value = null;
                         document.getElementById('eventNumber').value = null;
                         document.getElementById('eventName').value = null;
                    }
               }
          });
     }

     static alertId() {
          alert('You must provide your proper email address to continue.');
     }

     validate(data) {
          let validated = true;
          data[1] = 1;
          for (let i = 0; i < data.length; i++) {
               if (typeof data[i] === 'string') {
                    if (data[i] === '') {
                         alert(`Incorrect data entered. ${data[i]}`);
                         validated = false;
                         break;
                    }
               } else {
                    if (!/^\d{1,20}$/.test(data[i])) {
                         alert(`Incorrect data entered.`);
                         validated = false;
                         break;
                    }
               }
          }
          return validated;
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