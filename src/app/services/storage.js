'use strict';

angular.module('codeScanLog')
  .service('Storage', function () {
    function ls_get(key, def) {
      var it = localStorage.getItem(key);
      if(it) {
        return angular.fromJson(it);
      } else {
        return def;
      }
    }

    function ls_put(key, value) {
      localStorage.setItem(key, angular.toJson(value));
    }
    var TblObj = function(key) {

      this.get = function(id) {
        var data = ls_get(key + '_data', {});
        return data[id];
      }

      this.create = function(obj) {
        var meta = ls_get(key + '_meta', { seq: 0 });
        var data = ls_get(key + '_data', {});
        var id = ++meta.seq;
        obj.id = id;
        data[id] = obj;
        ls_put(key + '_meta', meta);
        ls_put(key + '_data', data);
        return obj;
      }

      this.update = function(obj) {
        if(!obj.id) {
          throw 'Object without id passed to be updated';
        }
        var data = ls_get(key + '_data', {});
        data[obj.id] = obj;
        ls_put(key + '_data', data);
      }

      this.remove = function(obj) {
        if(!obj.id) {
          throw 'Object without id passed to be updated';
        }
        var data = ls_get(key + '_data', {});
        delete data[obj.id];
        ls_put(key + '_data', data);
      }
      this.list = function() {
        var data = ls_get(key + '_data', {});
        var arr = [];
        for(var k in data) {
          arr.push(data[k]);
        }
        return arr;
      }
    }
    return {
      key: function(k) {
        return new TblObj(k);
      }
    }
  });
