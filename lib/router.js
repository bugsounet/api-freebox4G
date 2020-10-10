var utilities = require('./utilities');
var url = require('url-join');

function HuaweiRouter({ip, password}) {
  //@todo check
  this.options = {
    gateway: ip,
    password: password
  };
}

var API = HuaweiRouter.prototype;
module.exports = HuaweiRouter;
module.exports.create = create;

API.getAllClients = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/lan/HostInfo');
  utilities.contactRouter(uri, token, null, function(error, response) {
    callback(error, response);
  });
};

API.getMonthStatistics = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/month_statistics');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getSignal = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/start_date');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getStatus = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/status');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getTrafficStatistics = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/monitoring/traffic-statistics');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getBasicSettings = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/wlan/basic-settings');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getInformation = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/device/information');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getConnexion = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/dialup/mobile-dataswitch');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getCurrentPLMN = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/net/current-plmn');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.getToken = function (callback) {
  var uri = url('http://', this.options.gateway, '/api/webserver/SesTokInfo');
  utilities.contactRouter(uri, {}, null, function (error, response) {
    if (response !== null) {
      callback(error, {
        cookies: response.SesInfo[0],
        token: response.TokInfo[0]
      });
    } else {
      callback(error, null)
    }
  });
};

API.isLoggedIn = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/user/state-login');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.login = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/user/login');
  var body = {
    Username: "admin",
    password_type: 4,
    Password: utilities.SHA256andBase64(
      "admin" + utilities.SHA256andBase64(this.options.password) + token.token
    )
  };
  utilities.contactRouter(uri, token, body, function (error, response) {
    callback(error, response);
  });
}

function create(options) {
  return new HuaweiRouter(options);
}
