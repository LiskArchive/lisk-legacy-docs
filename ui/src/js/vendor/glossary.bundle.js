/* eslint-disable */
;(function () {
  'use strict'

  const json = require('../../glossary.json')
  console.log(json.key)

  const instance = new Mark(document.querySelector("article.doc"));

  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      instance.mark(key, {
        "element": "span",
        "className": "highlighttt",
        "accuracy": {
          "value": "exactly",
          "limiters": [",", "."]
        },
        "exclude": [
          "h1",
          "h2",
          "h3",
          "h4",
          ".toc *"
        ],
        "filter": function(node, term, totalCounter, counter){
          if(counter >= 1){
            return false;
          } else {
            return true;
          }
        }
      });
    }
  }

  const collection = document.getElementsByClassName("highlighttt");
  var arrayLength = collection.length;
  for (let i = 0; i < arrayLength; i++) {
    const para = document.createElement("p");
    para.setAttribute( 'class', 'tooltip' );
    const k = collection[i].textContent.toLowerCase();
    if (json.hasOwnProperty(k)){
      const node = document.createTextNode(json[k]);
      para.appendChild(node);
      collection[i].appendChild(para);
    }
  }
})()
