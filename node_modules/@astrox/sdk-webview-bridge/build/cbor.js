function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value1) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value1,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value1;
    }
    return obj;
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
import borc from "borc";
import { SelfDescribeCborSerializer, value } from "simple-cbor";
import { concat, fromHex } from "./buffer";
var BufferEncoder = function() {
    "use strict";
    function BufferEncoder() {
        _class_call_check(this, BufferEncoder);
    }
    _create_class(BufferEncoder, [
        {
            key: "name",
            get: function get() {
                return "Buffer";
            }
        },
        {
            key: "priority",
            get: function get() {
                return 1;
            }
        },
        {
            key: "match",
            value: function match(value) {
                return _instanceof(value, ArrayBuffer) || ArrayBuffer.isView(value);
            }
        },
        {
            key: "encode",
            value: function encode(v) {
                return value.bytes(new Uint8Array(v));
            }
        }
    ]);
    return BufferEncoder;
}();
var BigIntEncoder = function() {
    "use strict";
    function BigIntEncoder() {
        _class_call_check(this, BigIntEncoder);
    }
    _create_class(BigIntEncoder, [
        {
            key: "name",
            get: function get() {
                return "BigInt";
            }
        },
        {
            key: "priority",
            get: function get() {
                return 1;
            }
        },
        {
            key: "match",
            value: function match(value) {
                return (typeof value === "undefined" ? "undefined" : _type_of(value)) === "bigint";
            }
        },
        {
            key: "encode",
            value: function encode(v) {
                if (v > BigInt(0)) {
                    return value.tagged(2, value.bytes(fromHex(v.toString(16))));
                } else {
                    return value.tagged(3, value.bytes(fromHex((BigInt("-1") * v).toString(16))));
                }
            }
        }
    ]);
    return BigIntEncoder;
}();
var serializer = SelfDescribeCborSerializer.withDefaultEncoders(true);
serializer.addEncoder(new BufferEncoder());
serializer.addEncoder(new BigIntEncoder());
export var CborTag;
(function(CborTag) {
    CborTag[CborTag["Uint64LittleEndian"] = 71] = "Uint64LittleEndian";
    CborTag[CborTag["Semantic"] = 55799] = "Semantic";
})(CborTag || (CborTag = {}));
export function encode(value1) {
    return serializer.serialize(value1);
}
function decodePositiveBigInt(buf) {
    var len = buf.byteLength;
    var res = BigInt(0);
    for(var i = 0; i < len; i++){
        res = res * BigInt(0x100) + BigInt(buf[i]);
    }
    return res;
}
var Uint8ArrayDecoder = function(_borc_Decoder) {
    "use strict";
    _inherits(Uint8ArrayDecoder, _borc_Decoder);
    var _super = _create_super(Uint8ArrayDecoder);
    function Uint8ArrayDecoder() {
        _class_call_check(this, Uint8ArrayDecoder);
        return _super.apply(this, arguments);
    }
    _create_class(Uint8ArrayDecoder, [
        {
            key: "createByteString",
            value: function createByteString(raw) {
                return concat.apply(void 0, _to_consumable_array(raw));
            }
        },
        {
            key: "createByteStringFromHeap",
            value: function createByteStringFromHeap(start, end) {
                if (start === end) {
                    return new ArrayBuffer(0);
                }
                return new Uint8Array(this._heap.slice(start, end));
            }
        }
    ]);
    return Uint8ArrayDecoder;
}(borc.Decoder);
export function decode(input) {
    var buffer = new Uint8Array(input);
    var decoder = new Uint8ArrayDecoder({
        size: buffer.byteLength,
        tags: _define_property({
            2: function(val) {
                return decodePositiveBigInt(val);
            },
            3: function(val) {
                return -decodePositiveBigInt(val);
            }
        }, CborTag.Semantic, function(value) {
            return value;
        })
    });
    return decoder.decodeFirst(buffer);
}
