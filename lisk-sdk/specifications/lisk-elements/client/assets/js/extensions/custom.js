document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById("backlink").href;
    var linkArray = link.split('/');
    linkArray.slice
    let newArray = linkArray.slice(0, 7);
    var newLink = newArray.join('/');
    document.getElementById("backlink").href = newLink;
})
