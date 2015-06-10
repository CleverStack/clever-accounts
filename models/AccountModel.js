module.exports = function(Model, config, utils, UserModel) {
  return Model.extend('Account',
  {
    type              : config['clever-accounts'].driver || 'ORM',
    timeStampable     : true,
    softDeleteable    : false,

    'UserModel beforeAllFindersOptions': function(findOptions, queryOptions, callback) {
      utils
        .helpers
        .includeModel(findOptions, this, 'Account');

      callback(null);
    }
  },
  {
    id: {
      type            : Number,
      primaryKey      : true,
      autoIncrement   : true
    },
    name: {
      type            : String,
      default         : null
    },
    email: {
      type            : String,
      required        : true,
      validate        : {
        isEmail       : true
      }
    },
    active: {
      type            : Boolean,
      allowNull       : false,
      defaultValue    : false
    },
    subDomain: {
      type            : String,
      length          : 191,
      required        : true,
      unique          : true
    }
  });
};
