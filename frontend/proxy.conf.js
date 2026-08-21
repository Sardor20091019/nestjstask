module.exports = {
  "/api": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  },
  "/auth": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.includes("html")) {
        return "/index.html";
      }
    }
  },
  "/users": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.includes("html")) {
        return "/index.html";
      }
    }
  },
  "/organizations": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.includes("html")) {
        return "/index.html";
      }
    }
  },
  "/projects": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.includes("html")) {
        return "/index.html";
      }
    }
  },
  "/tasks": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.includes("html")) {
        return "/index.html";
      }
    }
  },
  "/statistics": {
    "target": "https://nestjstask-1.onrender.com",
    "secure": false,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept && req.headers.accept.includes("html")) {
        return "/index.html";
      }
    }
  }
};