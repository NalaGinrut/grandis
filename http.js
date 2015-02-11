/*  -*-  indent-tabs-mode:nil; coding: utf-8 -*-
  Copyright (C) 2015
      "Mu Lei" known as "NalaGinrut" <NalaGinrut@gmail.com>
  Grandis is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License by the Free
  Software Foundation, either version 3 of the License, or (at your
  option) any later version.

  Grandis is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.
  If not, see <http://www.gnu.org/licenses/>.
*/

var HTTP_Request =
  Class( 'HTTP_Request',
         {
           'private _obj' : 'undefined',

           'private _result' : 'undefined',

           'private ajax_ready' : false,

           'private gen_url' : function (url) {
             if (!this.use_cache) {
               var conj = (url.indexOf('?') == -1) ? '?' : '&';
               var time_param = '_=' + Date.now();
               url += conj + time_param;
             }
             return url;
           },

           'private init_jsonp' : function () {
             var elem = document.createElement('script');
             var eid = gensym('jsonp-script-');
             
             // NOTE: jsonp won't send data in POST. Because the data in GET
             //       was merged to url, so 'data' here will be ingored.
             // NOTE: 'method' is useless for jsonp, so it's ingored too.
             return function (url, method, pdata) {
               var final_url = this.gen_url(url);
               elem.setAttribute('type', 'text/javascript');
               elem.setAttribute('src', final_url);
               elem.setAttribute('id', eid);
               $('head').appendChild(elem);
               return elem;
             };
           },

           // NOTE: We must pass a callback in, since AJAX is async,
           //       so it needs a callback approach natually.
           'private callback' : 'undefined',

           'private init_ajax' : function () {
             var req = this;

             if (window.XMLHttpRequest) {
               // code for IE7+, Firefox, Chrome, Opera, Safari
               var ajax = new XMLHttpRequest();
             } else {
               // code for IE6, IE5
               $('html').innerHTML = '<p>Sorry, I don\'t want to suppport IE6 or IE5, please upgrade your browser!</p>';
               throw Error("Let me halt here!");
             }

             ajax.onreadystatechange = function() {
               if (4 == ajax.readyState && 200 == ajax.status) {
                 req._result = ajax.responseText;
                 req.ajax_ready = true;
                 if(req.callback !== 'undefined')
                   req.callback(req._result);
               }
             };
             
             return function (url, method, pdata) {
               var final_url = this.gen_url(url);
               this._result = 'undefined';
               this.ajax_ready = false;
               ajax.open(method, url, true);
               if (method === "POST")
                 ajax.send(data2url(pdata));
               else
                 ajax.send();
               //alert(this.callback);
               return 'Waiting for async result';
             };
           },

           'private clean_jsonp_tag' : function (id) {
             return $('head').removeChild(id);
           },

           'public set_callback' : function (callback) {
             alert("yes set!");
             this.callback = callback;
           },

           'public show_callback' : function () {
             return this.callback;
           },

           'public is_ready' : function () {
             return this.ajax_ready;
           },

           'public get_result' : function () {
             if (this.ajax_ready)
               return this._result;
             else
               return false;
           },

           'public use_cache' : false,

           // NOTE: qstr shouldn't be merged to url before calling 'send', we'll
           //       do this job explicitly in 'send'.
           'public send' : function (url, method, gdata, pdata) {
             var params = data2url(gdata);
             var full_url = !params ? url : url + '?' + params;
             return this._obj(full_url, method, pdata);
           },

           'public __construct' : function (mode, use_cache) {
             this.use_cache = is_defined(use_cache);
             switch (mode) {
             case 'ajax' : this._obj = this.init_ajax(); break;
             case 'jsonp' : this._obj = this.init_jsonp(); break;
             default : throw Error('HTTP_Request: invalid mode ' + mode);
             }
           }
         });

var HTTP_Response = Class( 'HTTP_Response',
                           {});

var HTTP_ACCEPT_MODES = ['ajax', 'jsonp'];
var HTTP_METHODS_HANDLERS = {
  'get' : function (req, url, gdata) {
    return req.send(url, gdata);
  },
  'post': function (req, url, pdata) {
    return req.send(url, 'undefined', pdata);
  }
};

// For better debuggning, we define all Classes as named class.
var HTTP =
  Class( 'HTTP',
         {
           // it's not allowed to change mode when the instance it made.
           'private mode' : 'ajax',
           
           'private is_valid_mode' : function (mode) {
             return ( HTTP_ACCEPT_MODES.indexOf (mode) >= 0 );
           },

           'private _req' : 'undefined',

           'private _init_req' : function (use_cache) {
             this._req = HTTP_Request (this.mode, use_cache);
           },

           'private do_request' : function (method, url, data, callback) {
             var handler = HTTP_METHODS_HANDLERS[method];
             if (handler === 'undefined')
               throw Error('HTTP: method "' + method + '" is not supported!');
             this._req.set_callback(callback);
             alert(this._req.show_callback());
             return handler(this._req, url, method, data);
           },

           'public set_cache' : function (val) {
             this._req.use_cache = val;
           },

           'public use_cache' : function () {
             return this._req.use_cache;
           },
           
           'public __construct' : function (mode, use_cache) {
             if (typeof mode === 'undefined')
               return;
             else if ( this.is_valid_mode (mode) )
               this.mode = mode;
             else
               throw Error('HTTP init: Invalid mode "' + mode + '"');
             
             this._init_req(use_cache);
           },
           
           'public is_ready' : function () {
             return this._req.is_ready();
           },

           'public get_mode' : function () { return this.mode; },
           
           //'public request' : 
           'public get' : function (url, data, callback) {
             return this.do_request('get', url, data, callback);
           }
         } );
