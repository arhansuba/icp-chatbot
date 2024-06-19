function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
export function concat() {
    for(var _len = arguments.length, buffers = new Array(_len), _key = 0; _key < _len; _key++){
        buffers[_key] = arguments[_key];
    }
    var result = new Uint8Array(buffers.reduce(function(acc, curr) {
        return acc + curr.byteLength;
    }, 0));
    var index = 0;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = buffers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var b = _step.value;
            result.set(new Uint8Array(b), index);
            index += b.byteLength;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return result.buffer;
}
export function toHex(buffer) {
    return _to_consumable_array(new Uint8Array(buffer)).map(function(x) {
        return x.toString(16).padStart(2, "0");
    }).join("");
}
var hexRe = new RegExp(/^([0-9A-F]{2})*$/i);
export function fromHex(hex) {
    if (hex.length % 2 !== 0) {
        hex = "0" + hex;
    }
    if (!hexRe.test(hex)) {
        throw new Error("Invalid hexadecimal string.");
    }
    var buffer = _to_consumable_array(hex).reduce(function(acc, curr, i) {
        acc[i / 2 | 0] = (acc[i / 2 | 0] || "") + curr;
        return acc;
    }, []).map(function(x) {
        return Number.parseInt(x, 16);
    });
    return new Uint8Array(buffer).buffer;
}
export function compare(b1, b2) {
    if (b1.byteLength !== b2.byteLength) {
        return b1.byteLength - b2.byteLength;
    }
    var u1 = new Uint8Array(b1);
    var u2 = new Uint8Array(b2);
    for(var i = 0; i < u1.length; i++){
        if (u1[i] !== u2[i]) {
            return u1[i] - u2[i];
        }
    }
    return 0;
}
