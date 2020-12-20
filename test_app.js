// An object consitis of below mentioned kind of entity
//an Object Entity with Typeof 'object' and getEntityType 'Object'.
// an Object Entity can have an object (Object / Array) inside it or a value.
//an Array Entity with Typeof 'object' and getEntityType 'Array'. 
// an 'Object' inside an array is a child of array, but then the array has values, they become it's values, with values/arrayname as attribute
// Keys inside an object with value [value cannot be an *Object] are attributes

var row = new Array('ehhid', 'd', 'parent', 'entityName', "typeOf", 'value');

function createRow(input, output, parent, id, d, key) {
    id = output.length;
    var newRow = [id, d, parent, key, getEntityType(input)];
    if (getEntityType(input) === "String") newRow.push(input);
    return newRow;
}

function updateRow(input, output, currentRow, prevRow, id, d, key, options, callback) {
    // console.log("updating Current Row",currentRow, output[0],key)
    fillEmptyDepth(currentRow, output[0])
    currentRow.splice(output[0].indexOf(key), 1, input);
    // console.log("updated", currentRow, output[0])
    return currentRow;
}

function obj2Array2(input, output, parentID, id, d, self) {

    // If the output is not present, create an EMPTY ARRAY
    if (output == undefined) {
        var output = []
    }

    if (!d) {
        var d = 0
    }

    d = d + 1;

    if (parentID == undefined) {
        var parentID = "root";
    };

    newRow = createRow(input, output, parentID, id, d, self)
    output.push(newRow);

    if (getEntityType(input) === 'Object') {

        // Iterating through each and every key in the object 'input'
        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            obj2Array2(input[key], output, self, id, d, key);
        }
    } else if (getEntityType(input) === "Array") {

        // iterating thorugh each and every element in the array 'input' 
        for (var i = 0; i < input.length; i++) {
            obj2Array2(input[i], output, self, id, d, i);
        }

        // So both the loops above do the same thing, iterate over all the keys/indexes of object/array. 
    }
    return output;
}

//helper Function to get the name protoNameof an entity
function getEntityType(entity) {
    return Object.getPrototypeOf(entity).constructor.name;//entity.__proto__.constructor.name
}

function fillEmptyDepth(input, header) {
    //console.log("filling gap",input)
    for (j = 1; j <= header.length - input.length; j++) {
        input.push("");
    }
    return input
}

//this function primarly check for the presence of a keys in any an array, if not present and options [ returns false and update and return position]
function validateNupdate(input, output) {
    if (output[0].indexOf(input) === -1 && typeof input !== null && typeof input !== undefined) {
        output[0].push(input);
    }
    return output;
}

function processTest(e) {
    e.preventDefault();

    console.log(sample2)
    var outputArray = obj2Array2(sample2, []);
    console.log(outputArray)
    outputJson = arr2Obj(outputArray);
    console.log(outputJson)
    console.log(sample4)
    var outputArray = obj2Array2(sample4, []);
    console.log(outputArray)
    outputJson = arr2Obj(outputArray);
    console.log(outputJson)
    console.log(samplen)
    var outputArray = obj2Array2(samplen, []);
    console.log(outputArray)
    outputJson = arr2Obj(outputArray);

    console.log(outputJson)
    document.getElementById("output").innerText = JSON.stringify(outputArray);
}

document.getElementById("get").addEventListener("click", processTest);



/*

The hasOwnProperty() method returns a boolean indicating whether the object 
has the specified property as its own property (as opposed to inheriting it).


const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// expected output: true

console.log(object1.hasOwnProperty('toString'));
// expected output: false

console.log(object1.hasOwnProperty('hasOwnProperty'));
// expected output: false


All descendents of Object inherit the hasOwnProperty method. This method can 
be used to determine whether an object has the specified property as a direct property 
of that object; unlike the in operator, this method does not check for a property 
in the object's prototype chain. If an Object is an Array, hasOwnProperty method can check whether an index exists.
*/
