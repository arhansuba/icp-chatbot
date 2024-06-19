export function fromHexString(hexString) {
    var _hexString_match;
    return new Uint8Array(((_hexString_match = hexString.match(/.{1,2}/g)) !== null && _hexString_match !== void 0 ? _hexString_match : []).map(function(byte) {
        return parseInt(byte, 16);
    })).buffer;
}
export function toHexString(bytes) {
    return new Uint8Array(bytes).reduce(function(str, byte) {
        return str + byte.toString(16).padStart(2, "0");
    }, "");
}
export function isDelegationValid(chain) {
    var _chain;
    if (!chain || !((_chain = chain) === null || _chain === void 0 ? void 0 : _chain.delegations)) {
        return false;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chain.delegations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var delegation = _step.value.delegation;
            if (parseInt(delegation.expiration, 16) / 1e6 <= +Date.now()) {
                return false;
            }
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
    return true;
}
