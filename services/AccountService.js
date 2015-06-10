module.exports = function(Promise, Service, AccountModel, config, UserService, _) {
  return Service.extend({

    model: AccountModel,

    create: function(values, queryOptions) {
      var createAccount = this._super;

      queryOptions  = queryOptions || {};

      values.name   = values.firstName + ' ' + values.lastName;
      values.active = !config[ 'clever-accounts' ].requireConfirmation ? true : false;

      if (values.subDomain) {
        values.subDomain = values.subDomain;
      } else if (values.domain) {
        values.subDomain = values.domain.replace('http://', '').replace('www.', '').split('.')[0];
      }

      return new Promise(function(resolve, reject) {
        var account;

        this
          .transaction(queryOptions)
          .then(this.callback(function() {
            return createAccount.apply(this, [values, queryOptions]);
          }))
          .then(function(_account) {
            account = _account
            var userData = _.extend({}, {
              AccountId     : account.id,
              title         : values.title || null,
              firstName     : values.firstName,
              lastName      : values.lastName,
              email         : values.email,
              username      : values.username || values.email,
              password      : values.password,
              phone         : values.phone || null,

              active        : true,
              confirmed     : config['clever-accounts'].emailConfirmation === true ? false : true,

              hasAdminRight : false
            });

            if (account.Roles && account.Roles.length) {
              userData.Role = account.Roles[0];
            }

            return UserService.create(userData, queryOptions);
          })
          .then(function(user) {
            return queryOptions.transaction.commit();
          })
          .then(function() {
            resolve(account);
          })
          .catch(function(err) {
            queryOptions
              .transaction
              .rollback()
              .then(reject.bind(null, err))
              .catch(reject);
          });
      }
      .bind(this));
    }
  });
};
