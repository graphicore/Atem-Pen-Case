/**
 * Copyright (c) 2011, Lasse Fister lasse@graphicore.de, http://graphicore.de
 *
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 *
 * This pen draws path data to a SVG path element. It inherts from BasePen.
 *
 * Noteable documents:
 *    http://www.w3.org/TR/SVG/paths.html#InterfaceSVGPathSegList
 *    http://www.w3.org/TR/SVG/paths.html#InterfaceSVGPathElement
 */

define([
    './BasePen'
], function(
    Parent
) {
    "use strict";

    /*constructor*/
    function SVGPen(path, glyphSet) {
        Parent.call(this, glyphSet);
        this.path = path;
        this.segments = path.pathSegList;
    }

    /*inheritance*/
    var _p = SVGPen.prototype = Object.create(Parent.prototype);
    _p.constructor = SVGPen;

    /*definition*/
        _p._commands = {
            'moveTo': 'createSVGPathSegMovetoAbs',
            'lineTo': 'createSVGPathSegLinetoAbs',
            'curveTo': 'createSVGPathSegCurvetoCubicAbs',
            'closePath': 'createSVGPathSegClosePath'
        };
        _p._addSegment = function(name, args_)
        {
                //make a real array out of this
            var args = args_ ? [].slice.call(args_) : [],
                // make a flat list out of the points, because the
                // SVG Path Commands work that way
                points = args.concat.apply([], args),
                cmd = this._commands[name],
                path = this.path,
                segment = path[cmd].apply(path, points);
            this.segments.appendItem(segment);
        };

        _p._moveTo = function(pt)
        {
            this._addSegment('moveTo', arguments);
        };

        _p._lineTo = function(pt)
        {
            this._addSegment('lineTo', arguments);
        };

        _p._curveToOne = function(pt1, pt2, pt3)
        {
            //notice that we change the order of the points
            this._addSegment('curveTo', [pt3, pt1, pt2]);
        };

        _p._closePath = function()
        {
            this._addSegment('closePath');
        };
        /**
         * Delete all segments from path
         */
        _p.clear = function()
        {
            this.segments.clear();
        };

    return SVGPen;
});
