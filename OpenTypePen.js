/**
 * Copyright (c) 2015, Felipe Correa da Silva Sanches <juca@members.fsf.org>
 * 
 * You should have received a copy of the MIT License along with this program.
 * If not, see http://www.opensource.org/licenses/mit-license.php
 * 
 */
define(
    [
        'opentype'
      , 'ufojs/tools/pens/BasePen'
    ],
    function(
        opentype
      , BasePen
) {
    "use strict";

    /*constructor*/
    function OpenTypePen (glyphs) {
        this.glyphs = glyphs;
        this.path = new opentype.Path();
    };

    /*inheritance*/
    OpenTypePen.prototype = Object.create(BasePen.prototype);

    /*definition*/
    enhance(OpenTypePen, {        
        _moveTo: function(pt, kwargs/* optional, object contour attributes*/)
        {
            this.path.moveTo(pt[0], pt[1]);
        },

        _lineTo: function(pt)
        {
            this.path.lineTo(pt[0], pt[1]);
        },

        get_glyph_path: function(){
           return this.path;
        }        
    });

    return OpenTypePen;
});
