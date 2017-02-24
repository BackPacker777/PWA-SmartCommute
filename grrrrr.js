/**
 *   Jiggery-Pokery with JavaScript functional programming
 *   Understanding Function Declarations, Function Expressions, & Immediately-invoked function expressions (IIFE)
 *
 *   REMEMBER: In JS, functions can values just like anything else on the right hand side of an assignment operator, '='
 *
 */

"use strict";

process.stdout.write('\x1Bc');                                         // Clears the screen

let text = '\nWHAT!?!?';
let talk0 = (statement) => { console.log(statement); };                // Function Expression, non-IIFE
let talk1 = (statement) => {
     speak(statement, (word) => {
          console.log(word)
     });
};                                                                    // Function Expression, also non-IIFE
let talk2 = speak(text, (word) => {
     console.log(word)
});                                                                   // Function Expression, IIFE

let animals = [
     {name: 'Fluffykins', species: 'rabbit'},
     {name: 'Caro', species: 'dog'},
     {name: 'Hamilton', species: 'dog'},
     {name: 'Harold', species: 'fish'},
     {name: 'Ursula', species: 'cat'},
     {name: 'Jimmy', species: 'fish'},
];                                                                    // Array of Objects (JSON)

(main => {
     speak('\tHello class!', say);                                    // Named method parameter
     speak('\t\tHello Howard', (word) => { console.log(word) });      // Anonymous arrow method parameter
     talk0('\tHello Kitty!');
     talk1('Hello Talker.');
     console.log(findAnimal('fish'));

})();                                                                 // Arrow IIFE (Immediately Invoked Function Expression)

function say(word) {
     console.log(word);
}

function speak(theWord, method) {
     method(theWord);
}

function findAnimal(whichAnimal) {
     return animals.filter((animal) => {
          return animal.toLowerCase().indexOf(whichAnimal.toLowerCase()) > -1;
     });
}


/*
 *  INFORMATIONAL:
 *
 *  http://stackoverflow.com/questions/336859/var-functionname-function-vs-function-functionname
 *  http://benalman.com/news/2010/11/immediately-invoked-function-expression/
 *
 *  Array Filtering:  http://adripofjavascript.com/blog/drips/filtering-arrays-with-array-filter
 *  Array Mapping:
 *
 * *//**
 * Created by bates.he.z on 2/23/2017.
 */
