var utilities = require('./utilities');
var url = require('url-join');
require('default');

function HuaweiRouter(options) {
  this.options = {
    gateway: '192.168.8.1'
  };
  this.options = this.options.default(options);
}

var API = HuaweiRouter.prototype;
module.exports = HuaweiRouter;
module.exports.create = create;


API.getHostList = function(token, callback) {
  var uri = url('http://', this.options.gateway, '/api/wlan/host-list');
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
  var uri = url('http://', this.options.gateway, '/api/device/signal');
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

API.getProfiles = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/dialup/profiles');
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

API.getLedStatus = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/led/circle-switch');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.setLedOn = function (token, value, callback) {
  var uri = url('http://', this.options.gateway, '/api/led/circle-switch');
  var body = {
    ledSwitch: value ? 1 : 0
  };
  body = `<?xml version:"1.0" encoding="UTF-8"?><request><ledSwitch>${value ? '1' : '0'}</ledSwitch></request>`
  utilities.contactRouter(uri, token, body, function (error, response) {
    callback(error, response);
  });
};

API.isLoggedIn = function (token, callback) {
  var uri = url('http://', this.options.gateway, '/api/user/state-login');
  utilities.contactRouter(uri, token, null, function (error, response) {
    callback(error, response);
  });
};

API.login = function (token, username, password, callback) {
  var uri = url('http://', this.options.gateway, '/api/user/login');
  var body = {
    Username: username,
    password_type: 4,
    Password: utilities.SHA256andBase64(
      username + utilities.SHA256andBase64(password) + token.token
    )
  };
  utilities.contactRouter(uri, token, body, function (error, response) {
    callback(error, response);
  });
}

/**
 * Set network mode. In parameters list below you can find some supported values.
 *
 * @param token The authorization token.
 * @param networkMode The network mode. 02-UMTS only, 03-LTE only
 * @param networkBand UMTS and GSM Bands. 3FFFFFFF - All supported
 * @param lteBand LTE Bands. 7FFFFFFFFFFFFFFF - All supported
 * @param callback The response callback.
 */
API.setNetworkMode = function (token, networkMode, networkBand, lteBand, callback) {
  var uri = url('http://', this.options.gateway, '/api/net/net-mode');
  body = `<?xml version: "1.0" encoding="UTF-8"?><request>
  <NetworkMode>${networkMode}</NetworkMode><NetworkBand>${networkBand}</NetworkBand><LTEBand>${lteBand}</LTEBand>
  </request>`;
  utilities.contactRouter(uri, token, body, function (error, response) {
    callback(error, response);
  });
};

function create(options) {
  return new HuaweiRouter(options);
}
