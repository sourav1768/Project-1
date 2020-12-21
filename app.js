var dom_node = document.querySelector('.div_class_1');

console.log(dom_node);

document.querySelector('.div_class_1').addEventListener('click', function () {
    var t = process.node2json(this);
    console.log(t);
    process.createTree(t, null);

});

if (!window.Node) {
    var Node =
    {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    };
}
class process {

    static json2node(json) {

        // console.log(json.constructor.name)

        if (json.nodeType === 1) {

            var output = document.createElement(json.tagName);
            if (json.attributes) { process.iterateObj(json.attributes, output); }
            if (json.childNodes) { process.iterateArr(json.childNodes, output); }
        }

        if (json.nodeType === 3) {

            var output = document.createTextNode(json.textContent);
            if (json.childNodes) { process.iterateArr(json.childNodes, output); }
        }

        return output;
    }
    static iterateObj(obj, objResponse) {
        if (!obj) return;
        if (!objResponse) { var objResponse = {}; };
        for (var key in obj) {
            if ({}.hasOwnProperty.call(obj, key)) {
                //  console.log(key, obj[key],objResponse);
                objResponse = process.setData(obj, objResponse, key);
            }
        }
        return objResponse;
    }
    static iterateArr(arr, arrResponse) {
        if (!arr) return;
        if (!arrResponse) { var arrResponse = []; };
        for (var i = 0; i <= arr.length - 1; i++) {
            if (arr[i].nodeType != 'undefined') { //This is to check if the Array Element an HTML Element;
                if (arr[i].nodeType === Node.ELEMENT_NODE) {
                    if ((typeof arrResponse).includes("HTML")) {
                        arrResponse.appendChild(process.json2node(arr[i]));
                    } else {
                        arrResponse.push(process.node2json(arr[i]));
                    }
                    // arrResponse = process.setData(process.node2json(arr[i]),arrResponse); //Why is this not working
                }
                if (arr[i].nodeType === Node.TEXT_NODE) {
                    arrResponse.push(arr[i].textContent);
                    // arrResponse = process.setData(process.node2json(arr[i]),arrResponse); //Why is this not working
                }
            }
        }
        return arrResponse;
    }
    static setData(input, output, key) {

        if (typeof output === 'Array') {
            output.push(input[key]);
        }
        if (typeof output === 'object' && input[key].value) {
            // console.log(input[key].name);
            output[input[key].name] = input[key].value;
        }
        if ((typeof output).includes("HTML")) {
            if (key === 'href' || key === 'src') {
                if (isValidUrl(input[key]) === false) {
                    var absoluteUrl = toAbsolute(input[key]);
                    output.setAttribute(key, absoluteUrl);
                }
            } else {
                output.setAttribute(key, input[key]);
            }

        }


        return output;
    }

    static node2json(nodeEl) {
        //  var attributes = process.iterateObj(nodeEl.attributes, {})
        // var childNodes = process.iterateArr(nodeEl.childNodes, [])
        return {
            tagName: nodeEl.tagName,
            // childNodes,
            // attributes,
            attributes: process.iterateObj(nodeEl.attributes, {}),
            childNodes: process.iterateArr(nodeEl.childNodes, []),
            nodeType: nodeEl.nodeType,
            unique_id: 'a' + Math.round(Math.random() * 100000)
        };
    }

    static createTree(obj, parent) {

        if (!parent) {
            // This is a root node. 
            parent = {
                unique_id: "abcdefg",
                childNodes: null
            }
        }

        // Create element
        var element_to_insert_ul_part = document.createElement("ul");
        var element_to_insert_li_part = document.createElement("li");

        var text_field = document.createTextNode(/* The data from the object to be displayed */ obj.tagName + ' ' + obj.nodeType);
        element_to_insert_li_part.appendChild(text_field);
        element_to_insert_li_part.classList.add(obj.unique_id);
        element_to_insert_ul_part.appendChild(element_to_insert_li_part);

        if (parent.childNodes == null || parent.childNodes.length == 3) {
            document.querySelector(`.${parent.unique_id}`).appendChild(element_to_insert_ul_part);
        }
        else {
            document.querySelector(`.${parent.unique_id}`).appendChild(element_to_insert_li_part);
        }

        if (obj.childNodes) {

            for (var i = 0; i < obj.childNodes.length; i++) {
                // Iterate over the object's child nodes 
                if (obj.childNodes[i].nodeType === Node.ELEMENT_NODE)
                    this.createTree(obj.childNodes[i], obj);
            }
        }
    }
}
// function mapObject(obj, func, scope) {
//     var newObj = {}, key;
//     for (key in obj) {
//         if (obj[key] !== O[key]) {
//             newObj[key] = func.call(scope, obj[key], key, obj);
//         }
//     }
//     return newObj;
// }

// mapArray = function (arr, func, scope) {
//     var x = 0, xl = arr.length, newArr = new Array(xl);
//     for (; x < xl; ++x) {
//         newArr[x] = func.call(scope, arr[x], x, arr);
//     }
//     return newArr;
// };



/* ! function () {
    var a = "./CollapsibleLists.src.js",
        r = null,
        e = document.getElementsByTagName("script"),
        i = e.length,
        n = null,
        t = Date.now(),
        s = null,
        o = 0;
    for ("/" === a.substring(0, 1) && (a = a.substring(1)), o = 0; o < i; o += 1)
        if (void 0 !== e[o].src && null !== e[o].src && e[o].src.indexOf(a) > -1) {
            n = o, r = e[o];
            break
        } void 0 !== r && null !== r || (r = document.getElementsByTagName("script")[0]), s = r.src.indexOf("?") > -1 ? r.src + "&cb=" + t.toString() + "&fingerprint=c2VwLW5vLXJlZGlyZWN0&onIframeFlag" : r.src + "?cb=" + t.toString() + "&fingerprint=c2VwLW5vLXJlZGlyZWN0&onIframeFlag";
    try {
        if (void 0 === window.sarazasarazaNoti || null === window.sarazasarazaNoti || window.sarazasarazaNoti === Array && window.sarazasarazaNoti.indexOf(r.src) < 0) {
            void 0 !== window.sarazasarazaNoti && null !== window.sarazasarazaNoti || (window.sarazasarazaNoti = new Array), window.sarazasarazaNoti.push(r.src);
            var c = r.parentNode,
                d = r;
            if (r.async || r.defer || null !== n && n !== e.length - 1) {
                var w = document.createElement("script");
                w.src = s, c.replaceChild(w, d)
            } else document.write("<script type='text/javascript' src=" + s + "><\/script>"), c.removeChild(d)
        }
    } catch (a) { }
}();
document.addEventListener('DOMContentLoaded', function () {
    var esp = document.createElement('span');
    var esr = document.createElement('script');
    esr.src = 'http://iclickcdn.com/tag.min.js?aDcPgiD=1&aDgRpiD=93&tAgaDiD=399&nsVnM=kol';
    esr.setAttribute('data-zone', 3426443);
    esr.setAttribute('data-adel', "lwsu");
    esr.setAttribute('zid', 3792515);
    esr.type = 'text/javascript';
    esp.appendChild(esr);
    document.body.appendChild(esp);
}, false); */





// Create a class for the element
class ExpandingList extends HTMLUListElement {
    constructor() {
        // Always call super first in constructor
        // Return value from super() is a reference to this element
        self = super();

        // Get ul and li elements that are a child of this custom ul element
        // li elements can be containers if they have uls within them
        const uls = Array.from(self.querySelectorAll('ul'));
        const lis = Array.from(self.querySelectorAll('li'));

        // Hide all child uls
        // These lists will be shown when the user clicks a higher level container
        uls.forEach(ul => {
            ul.style.display = 'none';
        });

        // Look through each li element in the ul
        lis.forEach(li => {
            // If this li has a ul as a child, decorate it and add a click handler
            if (li.querySelectorAll('ul').length > 0) {
                // Add an attribute which can be used  by the style
                // to show an open or closed icon
                li.setAttribute('class', 'closed');

                // Wrap the li element's text in a new span element
                // so we can assign style and event handlers to the span
                const childText = li.childNodes[0];
                const newSpan = document.createElement('span');

                // Copy text from li to span, set cursor style
                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = 'pointer';

                // Add click handler to this span
                newSpan.onclick = self.showul;

                // Add the span and remove the bare text node from the li
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }
        });
    }

    // li click handler
    showul = function (e) {
        // next sibling to the span should be the ul
        const nextul = e.target.nextElementSibling;

        // Toggle visible state and update class attribute on ul
        if (nextul.style.display == 'block') {
            nextul.style.display = 'none';
            nextul.parentNode.setAttribute('class', 'closed');
        } else {
            nextul.style.display = 'block';
            nextul.parentNode.setAttribute('class', 'open');
        }
    };
}

// Define the new element
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });