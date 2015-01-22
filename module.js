module.exports  = require( 'classes' ).Module.extend({
    preRoute: function( UserModel, AccountModel ) {
        UserModel.on( 'preQuery', function( options ) {
            var nestedInclude = {
                model   : AccountModel._model
            };

            if ( typeof options.include === 'undefined' ) {
                options.include = [];
            }
            if ( options.include.indexOf( nestedInclude ) === -1 ) {
                options.include.push( nestedInclude );
            }
        });
    }
});