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

$ = function (lst) {
  var gen_elems = function (p, x, i, arr) {
    var name = x.match(/^([#.]?)(\w+)/);
    var ret;
    switch (name[1]) {
    case '#': ret = p.getElementById(name[2]); break;
    case '.': ret = p.getElementsByClassName(name[2]); break;
    case '': ret = p.getElementsByTagName(name[2]); break;
    default: throw('gen_elems in $: Invalid pattern!' + x);
    }
    return ret;
  }
  var tokens = lst.match(/[.#]?\w+/g);
  return tokens.reduce(gen_elems, document);
}

