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

var gensym = (function () {
  var cnt = 0;
  return function (name) { return name + cnt++; };
}) ();

function is_defined(x) {
  return ((x !== 'undefined') && x);
}

function data2url(data) {
  var ret = [];
  for (var k in data) {
    ret.push(k + '=' + data[k]);
  }

  return ret.join('&');
}
    
// (let ((cnt 0))
//  ...)

// ==> (function () { var cnt = 0; ... }) ();
