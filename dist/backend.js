module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const config = __webpack_require__(1);
const locales = __webpack_require__(2);
const errors = __webpack_require__(4);
const middlewares = __webpack_require__(5);

module.exports = app => {

  // routes
  const routes = __webpack_require__(6)(app);
  // services
  const services = __webpack_require__(10)(app);
  // models
  const models = __webpack_require__(12)(app);
  // meta
  const meta = __webpack_require__(13)(app);

  return {
    routes,
    services,
    models,
    config,
    locales,
    errors,
    middlewares,
    meta,
  };

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};

  // plugin
  config.plugin = {
    submit: {
      baidu: {
        token: '',
      },
    },
  };

  // queues
  config.queues = {
    submit: {
      path: 'util/queueSubmit',
    },
  };

  return config;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  'zh-cn': __webpack_require__(3),
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// error code should start from 1001
module.exports = {
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(7);
const util = __webpack_require__(8);

module.exports = app => {
  const routes = [
    // version
    { method: 'post', path: 'version/update', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/init', controller: version, middlewares: 'inner' },
    { method: 'post', path: 'version/test', controller: version, middlewares: 'test' },
    // util
    { method: 'post', path: 'util/submit', controller: util, middlewares: 'inner' },
    { method: 'post', path: 'util/queueSubmit', controller: util, middlewares: 'inner',
      meta: { auth: { enable: false } },
    },
  ];
  return routes;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = app => {
  class VersionController extends app.Controller {

    async update() {
      await this.service.version.update(this.ctx.request.body);
      this.ctx.success();
    }

    async init() {
      await this.service.version.init(this.ctx.request.body);
      this.ctx.success();
    }

    async test() {
      await this.service.version.test(this.ctx.request.body);
      this.ctx.success();
    }

  }
  return VersionController;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const url = __webpack_require__(9);

module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  class UtilController extends app.Controller {

    async submit() {
      const { links, config } = this.ctx.request.body;
      for (const target in config.submit) {
        const targetConfig = config.submit[target];
        if (target === 'baidu') {
          await this._submitBaidu({ target, targetConfig, links });
        }
      }
      this.ctx.success();
    }

    async queueSubmit() {
      const { target, targetConfig, hostname, links } = this.ctx.request.body;
      if (target === 'baidu') {
        await this._queueSubmitBaidu({ target, targetConfig, hostname, links });
      }
      this.ctx.success();
    }

    async _queueSubmitBaidu({ targetConfig, hostname, links }) {
      // submit
      const url = `http://data.zz.baidu.com/urls?site=${hostname}&token=${targetConfig.token}`;
      const options = {
        method: 'POST',
        contentType: 'text/plain',
        dataType: 'json',
        data: links.join('\n'),
      };
      const res = await this.ctx.curl(url, options);
      if (res.status !== 200) {
        // log
        this.ctx.logger.error(new Error(res.data && res.data.message));
      } else {
        // log
        this.ctx.logger.info(`submit baidu: ${links.join('\n')}`);
      }
    }

    async _submitBaidu({ target, targetConfig, links }) {
      if (!targetConfig.token) return;
      if (!links || links.length === 0) return;
      // host
      const parts = url.parse(links[0]);
      const hostname = parts.hostname;
      if (!hostname || hostname === 'localhost') return;
      // queue
      this.ctx.tail(() => {
        this.ctx.app.meta.queue.push({
          locale: this.ctx.locale,
          subdomain: this.ctx.subdomain,
          module: moduleInfo.relativeName,
          queueName: 'submit',
          data: {
            target, targetConfig,
            hostname, links,
          },
        });
      });
    }

  }
  return UtilController;
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(11);

module.exports = app => {
  const services = {
    version,
  };
  return services;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = app => {

  class Version extends app.Service {

    async update(options) {
    }

    async init(options) {
    }

    async test() {
    }

  }

  return Version;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = app => {
  const models = {
  };
  return models;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = app => {
  const schemas = __webpack_require__(14)(app);
  const meta = {
    base: {
      atoms: {
      },
      functions: {
      },
    },
    validation: {
      validators: {
      },
      keywords: {},
      schemas: {
      },
    },
  };
  return meta;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = app => {
  const schemas = {};
  return schemas;
};


/***/ })
/******/ ]);
//# sourceMappingURL=backend.js.map