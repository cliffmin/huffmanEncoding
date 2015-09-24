Array.prototype.contains = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
    }
    return false;
};

Array.prototype.getUnique = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

Number.prototype.addCharacter = function (cA, cB) {
    var caller = this;
    if (typeof this.characters === 'undefined') caller.characters = [];
    if (typeof cB !== 'undefined') cB.forEach(function (c) {
        caller.characters.push(c)
    });

    cA.forEach(function (c) {
        caller.characters.push(c)
    });
}
Number.prototype.getCharacters = function () {
    return this.characters;
}


/**
 * Usage
 * @example
 * Sample Usage:
    var heapq = new MinHeap();
    heapq.push(5);
    heapq.push(2);
    heapq.push(1);
    heapq.pop()); // returns 1
    heapq.pop()); // returns 2
 * @param array Array to use heapify or null to start with an empty
 * heap.
 * @param comparator alternate comparator used to compare each
 * item within the heap.  If not provided, the default will perform
 * a simple comparison on the item.
 *
 * @returns instance of MinHeap
 * @constructor
 */
function MinHeap(array, comparator) {

    /**
     * Storage for heap.
     * @private
     */
    this.heap = array || new Array();

    /**
     * Default comparator used if an override is not provided.
     * @private
     */
    this.compare = comparator || function (item1, item2) {
        return item1 == item2 ? 0 : item1 < item2 ? -1 : 1;
    };

    /**
     * Retrieve the index of the left child of the node at index i.
     * @private
     */
    this.left = function (i) {
        return 2 * i + 1;
    };
    /**
     * Retrieve the index of the right child of the node at index i.
     * @private
     */
    this.right = function (i) {
        return 2 * i + 2;
    };
    /**
     * Retrieve the index of the parent of the node at index i.
     * @private
     */
    this.parent = function (i) {
        return Math.ceil(i / 2) - 1;
    };

    /**
     * Ensure that the contents of the heap don't violate the
     * constraint.
     * @private
     */
    this.heapify = function (i) {
        var lIdx = this.left(i);
        var rIdx = this.right(i);
        var smallest;
        if (lIdx < this.heap.length && this.compare(this.heap[lIdx], this.heap[i]) < 0) {
            smallest = lIdx;
        } else {
            smallest = i;
        }
        if (rIdx < this.heap.length && this.compare(this.heap[rIdx], this.heap[smallest]) < 0) {
            smallest = rIdx;
        }
        if (i != smallest) {
            var temp = this.heap[smallest];
            this.heap[smallest] = this.heap[i];
            this.heap[i] = temp;
            this.heapify(smallest);
        }
    };

    /**
     * Starting with the node at index i, move up the heap until parent value
     * is less than the node.
     * @private
     */
    this.siftUp = function (i) {
        var p = this.parent(i);
        if (p >= 0 && this.compare(this.heap[p], this.heap[i]) > 0) {
            var temp = this.heap[p];
            this.heap[p] = this.heap[i];
            this.heap[i] = temp;
            this.siftUp(p);
        }
    };

    /**
     * Heapify the contents of an array.
     * This function is called when an array is provided.
     * @private
     */
    this.heapifyArray = function () {
        // for loop starting from floor size/2 going up and heapify each.
        var i = Math.floor(this.heap.length / 2) - 1;
        for (; i >= 0; i--) {
            //  jstestdriver.console.log("i: ", i);
            this.heapify(i);
        }
    };

    // If an initial array was provided, then heapify the array.
    if (array != null) {
        this.heapifyArray();
    };
}

/**
 * Place an item in the heap.
 * @param item
 * @function
 */
MinHeap.prototype.push = function (item) {
    this.heap.push(item);
    this.siftUp(this.heap.length - 1);
};

/**
 * Insert an item into the heap.
 * @param item
 * @function
 */
MinHeap.prototype.insert = function (item) {
    this.push(item);
};

/**
 * Pop the minimum valued item off of the heap. The heap is then updated
 * to float the next smallest item to the top of the heap.
 * @returns the minimum value contained within the heap.
 * @function
 */
MinHeap.prototype.pop = function () {
    var value;
    if (this.heap.length > 1) {
        value = this.heap[0];
        // Put the bottom element at the top and let it drift down.
        this.heap[0] = this.heap.pop();
        this.heapify(0);
    } else {
        value = this.heap.pop();
    }
    return value;
};

/**
 * Remove the minimum item from the heap.
 * @returns the minimum value contained within the heap.
 * @function
 */
MinHeap.prototype.remove = function () {
    return this.pop();
};


/**
 * Returns the minimum value contained within the heap.  This will
 * not remove the value from the heap.
 * @returns the minimum value within the heap.
 * @function
 */
MinHeap.prototype.getMin = function () {
    return this.heap[0];
};

/**
 * Return the current number of elements within the heap.
 * @returns size of the heap.
 * @function
 */
MinHeap.prototype.size = function () {
    return this.heap.length;
};

var F = 'hello yellow cows';

var root = function (textString) {
    textString = textString.replace(/\s+/g, '');
    var i = 0;
    var freq = {};
    var outer = true;
    var freqC = [];
    var numArray = [];
    var letters = [];

    while (outer) {
        if (!freq[textString.charAt(i)]) {
            freq[textString.charAt(i)] = 1;

            for (var j = i + 1; j < F.length; j++) {
                if (textString.charAt(i) === textString.charAt(j)) freq[textString.charAt(i)]++;
            }
            letters.push(textString.charAt(i));
            numArray.push(freq[textString.charAt(i)]);
        }
        i++;
        if (i === textString.length) {
            outer = false;
        }
    }
    return function (freqs, numArray, letters) {
        var result = [];
        for (var i = 0; i < numArray.length; i++) {
            for (var j = 0; j < letters.length; j++) {
                if (numArray[i] === freqs[letters[j]]) {
                    result.push(letters[j]);
                    result.push(numArray[i]);
                }
            }
        }
        result.letters = letters;
        return function (sortFreqs) {
            var heap = new MinHeap();
            var temp;

            //['a', 1, 'b', 2]
            for (i = 0; i < sortFreqs.length; i = i + 2) {
                temp = new Number(sortFreqs[i + 1]);
                temp.addCharacter(new Array(sortFreqs[i]));
                heap.insert(temp);
            }

            var min1;
            var min2;
            var node;
            var root;
            var cont = true;

            while (cont) {
                min1 = heap.pop();
                min2 = heap.pop();
                node = new Number(min1 + min2);
                node.addCharacter(min1.getCharacters(), min2.getCharacters());
                node.rightChild = min1;
                node.leftChild = min2;
                heap.insert(node);
                if (heap.size() === 1) {
                    root = heap.pop();
                    cont = false;
                } else if (heap.size() > F.length * 20) {
                    cont = false;
                    alert('something went wrong');
                }
            }
            root.letters = sortFreqs.letters;
            return root;
        }(result);
    }(freq, numArray.sort().getUnique(), letters);
}(F);

//left = 1, right = 0
var encodings = function(root){
    var nextNode = root;
    var result = {};
    root.letters.forEach(function(letter){
        result[letter] = [];
        var notFound = true;
        while(notFound){
            if(nextNode.leftChild.getCharacters().contains(letter)){
                nextNode = nextNode.leftChild;
                result[letter].push(1);
            }
            else{
                nextNode = nextNode.rightChild;
                result[letter].push(0);
            }

            if(typeof nextNode.leftChild === 'undefined'){
                notFound = false;
                nextNode = root;
            }
        }
    });
    return result;
}(root);

debugger;
