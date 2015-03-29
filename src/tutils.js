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
    path: function () {
        var args = api.slice(arguments), l = args.length, i = 0, j = 0, p;
        var ret = '';
        for (; i < l; i++) {
            p = args[i];
            if (p == null || p === '') continue;
            ret += (j++ === 0) ? p : "." + p;
        }
        return ret;

    },
    flatten:Function.apply.bind(Array.prototype.concat, []),
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
        return v != null;
    }
}
module.exports = api;