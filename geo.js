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

var Geo =
  Class( 'Geo',
         {
           'private _obj' : 'undefined',

           'private _options' : 'undefined',
           
           'private _last' : 'undefined',

           'private getpos_err' : function (err) {
             switch(err.code) {
             case err.PERMISSION_DENIED:
               alert("Geo error: user denied the request for Geolocation."); break;
             case err.POSITION_UNAVAILABLE:
               alert("Geo error: location information is unavailable."); break;
             case err.TIMEOUT:
               alert("Geo error: the request to get user location timed out."); break;
             default:
               alert("Geo error: an unknown error occurred.");
             }
           },
             
           'public find_me' : function (callback) {
             this._obj.getCurrentPosition(callback, this.getpos_err, this._options);
           },

           'public trace_me' : function (callback) {
             this._obj.watchPosition(callback, this.getpos_err, this._options);
           },

           'public save' : function (p) { this._last = p },

           'public last' : function () { return this._last; },

           'public __construct' : function (options) {
             if (navigator.geolocation) {
               this._obj = navigator.geolocation;
               this._options = options;
             } else {
               $('html').innerHTML = "<p>Geolocation is not supported by this browser.</p>";
             }
           }

         });
