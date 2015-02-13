module.exports  = require( 'classes' ).Module.extend({
    preRoute: function( UserModel, AccountModel, _ ) {
        UserModel.on('beforeAllFindersOptions', function(findOptions, queryOptions, callback) {
            findOptions.include = findOptions.include || [];

            if (!_.findWhere(findOptions.include, { model: AccountModel._model })) {
                findOptions.include.push({
                    model : AccountModel._model
                });
            }

            callback(null);
        });
    }
});