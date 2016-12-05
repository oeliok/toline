/**
 * Created by oeli on 16-12-3.
 */

module.exports = Forms;

function Forms() {
    this.data = null;
    this.msgs = '';
    this.rules = null;
    this.setData = function (data) {
        this.data = data;
    };
    this.setRules = function (rules) {
        this.rules = rules;
    };
    this.isok = function () {
        for (var i in this.rules){
            if (this.rules[i].require) {
                if (this.data[i]){
                    for (var j in this.rules[i]) {
                        if (!this[j](this.rules[i][j],this.data[i],this.rules[i].msg)){
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    };
    this.getErrorMsg = function () {
        return this.msgs;
    };
    this.require = function (rv, v, msg) {
        if ((typeof v) == 'undefined' || v == null) {
            this.msgs = this.msgs + msg + ';';
            return false;
        }
        return true;
    };
    this.min = function (rv, v, msg) {
        if (rv > v){
            this.msgs = this.msgs + msg + ';';
            return false;
        }
        return true;
    };
    this.max = function (rv, v, msg) {
        if (rv < v) {
            this.msgs = this.msgs + msg + ';';
            return false;
        }
        return true;
    };
    this.msg = function () {
        return true;
    };
    this.minlen = function (rv, r, msg) {
        if((typeof r) != 'string' || r.length < rv){
            this.msgs = this.msgs + msg + ';';
            return false;
        }
        return true;
    };
    this.maxlen = function (rv, r, msg) {
        if((typeof r) != 'string' || r.length > rv){
            this.msgs = this.msgs + msg + ';';
            return false;
        }
        return true;
    };
    this.len = function (rv, r, msg) {
        if ((typeof r) != 'string' || r.length != rv){
            this.msgs = this.msgs + msg + ';';
            return false;
        }
        return true;
    };
    this.addfun = function (name,action) {
        this[name] = action;
    }
}
