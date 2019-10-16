document.addEventListener('DOMContentLoaded', function() {
    var pre = document.getElementsByTagName('pre');
    for (var i = 0; i < pre.length; i++) {
        var b = document.createElement('button');
        //var img = document.createElement('img');
        //img.src ='copy.png';
        b.className = 'clipboard';
        //b.textContent = 'Copy';
        if (pre[i].childNodes.length === 1 && pre[i].childNodes[0].nodeType === 3) {
            var div = document.createElement('div');
            div.textContent = pre[i].textContent;
            pre[i].textContent = '';
            pre[i].appendChild(div);
        }
       // b.appendChild(img);
        pre[i].appendChild(b);
    }
    new ClipboardJS('.clipboard', {
        target: function(b) {
            var p = b.parentNode;
            return p.className.includes("hljs")
                ? p.getElementsByClassName("code")[0]
                : p.childNodes[0];
        }
    }).on('success', function(e) {
        //e.clearSelection();
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        var label = document.createAttribute("aria-label");
        var balloon = document.createAttribute("data-balloon-pos");
        label.value = "Copied";
        balloon.value = "down";
        e.trigger.setAttributeNode(label);
        e.trigger.setAttributeNode(balloon);
        /*var tooltip = document.createElement('span');
        tooltip.className = 'tooltipped tooltipped-w m-2 p-2 border';
        tooltip['aria-label'] = 'copied';*/
        //e.trigger.appendChild(tooltip)
        //e.trigger["aria-label"] = 'Copied';
       // e.trigger["data-balloon-pos"] = 'right';
        //e.trigger.style.background = 'transparent';
        setTimeout(function() {
            e.trigger.removeAttribute("aria-label");
            e.trigger.removeAttribute("data-balloon-pos");
        }, 2000);
    });
});
