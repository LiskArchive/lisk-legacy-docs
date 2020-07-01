document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById("backlink").href;
    console.log("+++++++++++LINK++++++++++++");
    console.log(link);
    var linkArray = link.split('/');
    linkArray.slice
    let newArray = linkArray.slice(0, 6);
    var newLink = newArray.join('/');
    console.log("+++++++++++NEW LINK++++++++++++");
    console.log(newLink);
    document.getElementById("backlink").href = newLink;
})
