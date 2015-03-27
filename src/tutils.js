var api = {
    isString: function (v) {
        return typeof v === 'string' || v instanceof String;
    },
    unique: function (array) {
        return array.filter(function (a, b, c) {
            // keeps first occurrence
            return c.indexOf(a) === b;
        });
    },
    toArray: function (v) {
        if (Array.isArray(v)) {
            return v;
        }
        if (api.isString(v)) {
            return v.split(/\,\s*/);
        }
        if (v == null) {
            return [];
        }
        return [v];
    },
    slice: Function.call.bind(Array.prototype.slice),
    debounce: function (fn, to) {
        var ti;

        return function f() {
            clearTimeout(ti);
            var args = Array.prototype.slice.call(arguments), self = this;
            ti = setTimeout(function () {
                fn.apply(self, args);
            }, to);
        }
    },
    nullCheck: function (v) {
        return v == null;
    }
}
module.exports = api;