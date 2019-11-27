;(function () {
    'use strict'

   // document.addEventListener('DOMContentLoaded', function () {
        //var editUrl = document.querySelector('.edit-this-page');
        var editUrl = document.querySelector('.edit-this-page').childNodes[0].href;
        console.log("EditURL : ");
        console.dir(editUrl);
        var Contributors = editUrl.replace("/blob/", "/contributors-list/");
        var contris = document.querySelector('.contributors-of-page').childNodes[0];
        contris.href = Contributors;
        console.log("Contributors : ");
        console.dir(Contributors);
   // })

})()
