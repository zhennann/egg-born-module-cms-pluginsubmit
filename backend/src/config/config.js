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
