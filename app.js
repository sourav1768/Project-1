var dom_node = document.querySelector('.div_class_1');

console.log(dom_node);

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
                    if (getEntityType(arrResponse).includes("HTML")) {
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
        if (getEntityType(output).includes("HTML")) {
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
            nodeType: nodeEl.nodeType
        };
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

function createTree(obj, parent) {

    if (!parent) {
        // This is a root node. 
    }

    // Create element
    var element_to_insert_ul_part = document.createElement("ul");
    var element_to_insert_li_part = document.createElement("li");

    var text_field = document.createTextNode(/* The data from the object to be displayed */);
    element_to_insert_li_part.appendChild(text_field);
    element_to_insert_li_part.classList.add(`${/* Get from the object */ obj.tagName}`);
    element_to_insert_ul_part.appendChild(element_to_insert_li_part);

    document.querySelector(`.${parent.class_name}`).appendChild(element_to_insert_ul_part);
    
    for (var i = 0; i < obj.childNodes.length; i++ ) {
        // Iterate over the object's child nodes 
        createTree(obj,obj.childNodes[i]);
    }
}

