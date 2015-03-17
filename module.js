var Module         = require('classes').Module;

var CleverAccounts = Module.extend({
  preRoute: function(UserModel, AccountModel, _) {
    UserModel.on('beforeAllFindersOptions', function(findOptions, queryOptions, callback) {
      findOptions.include = findOptions.include || [];

      if (!_.findWhere(findOptions.include, { model: AccountModel.entity })) {
        findOptions.include.push({
          model : AccountModel.entity
        });
      }

      callback(null);
    });
  }
});

module.exports = CleverAccounts;
