"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/findOnStartup";
exports.ids = ["pages/api/findOnStartup"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "(api)/./model/state.js":
/*!************************!*\
  !*** ./model/state.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst stateSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: String,\n    state: String\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stateSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbC9zdGF0ZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBeUM7QUFLekMsTUFBTUUsV0FBVyxHQUFHLElBQUlGLDRDQUFNLENBQzFCO0lBQ0lHLElBQUksRUFBRUMsTUFBTTtJQUNaQyxLQUFLLEVBQUVELE1BQU07Q0FDaEIsQ0FDSjtBQUlELGlFQUFlRixXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFydGhvbWUtYXBwLy4vbW9kZWwvc3RhdGUuanM/MTQ5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTY2hlbWEsIG1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuXHJcblxyXG5cclxuY29uc3Qgc3RhdGVTY2hlbWEgPSBuZXcgU2NoZW1hKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFN0cmluZyxcclxuICAgICAgICBzdGF0ZTogU3RyaW5nXHJcbiAgICB9XHJcbik7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0YXRlU2NoZW1hOyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb2RlbCIsInN0YXRlU2NoZW1hIiwibmFtZSIsIlN0cmluZyIsInN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./model/state.js\n");

/***/ }),

/***/ "(api)/./pages/api/findOnStartup.js":
/*!************************************!*\
  !*** ./pages/api/findOnStartup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _model_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../model/state */ \"(api)/./model/state.js\");\n/* harmony import */ var _util_dbconnect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/dbconnect */ \"(api)/./util/dbconnect.js\");\n\n\n\n//find all document in state collection return an array response\nconst connectionString = process.env.MONGO_STRING;\nasync function findHandler(req, res) {\n    try {\n        const query = req.query;\n        const { name  } = query;\n        //console.log('connecting to mongodb');\n        //await dbConnect();\n        //mongoose.connect(connectionString);\n        //console.log('connected to mongo');\n        let State;\n        try {\n            State = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"State\");\n        } catch  {\n            State = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"State\", _model_state__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n        }\n        console.log(\"Reading DOCUMENT\");\n        const currentState = await State.find({\n            \"name\": name\n        });\n        //console.log(currentState);\n        console.log(\"Adopt DOCUMENT\");\n        res.json(currentState);\n    } catch (error) {\n        res.json(error);\n        console.log(error);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findHandler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZmluZE9uU3RhcnR1cC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNnQztBQUNXO0FBQ0U7QUFFN0MsZ0VBQWdFO0FBQ2hFLE1BQU1HLGdCQUFnQixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsWUFBWTtBQUNqRCxlQUFlQyxXQUFXLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFHO0lBRWxDLElBQUk7UUFDQSxNQUFNQyxLQUFLLEdBQUdGLEdBQUcsQ0FBQ0UsS0FBSztRQUN2QixNQUFNLEVBQUVDLElBQUksR0FBRSxHQUFHRCxLQUFLO1FBQ3RCLHVDQUF1QztRQUN2QyxvQkFBb0I7UUFDcEIscUNBQXFDO1FBQ3JDLG9DQUFvQztRQUNwQyxJQUFJRSxLQUFLO1FBQ1QsSUFBSTtZQUNBQSxLQUFLLEdBQUdaLHFEQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxPQUFNO1lBQ0pZLEtBQUssR0FBR1oscURBQWMsQ0FBQyxPQUFPLEVBQUVDLG9EQUFXLENBQUMsQ0FBQztTQUNoRDtRQUVEYSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLE1BQU1DLFlBQVksR0FBRyxNQUFNSixLQUFLLENBQUNLLElBQUksQ0FBQztZQUFDLE1BQU0sRUFBRU4sSUFBSTtTQUFDLENBQUM7UUFDckQsNEJBQTRCO1FBQzVCRyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRzlCTixHQUFHLENBQUNTLElBQUksQ0FBQ0YsWUFBWSxDQUFDLENBQUM7S0FHMUIsQ0FDRCxPQUFPRyxLQUFLLEVBQUU7UUFDVlYsR0FBRyxDQUFDUyxJQUFJLENBQUNDLEtBQUssQ0FBQztRQUNmTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ksS0FBSyxDQUFDLENBQUM7S0FDdEI7Q0FFSjtBQUNELGlFQUFlWixXQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc21hcnRob21lLWFwcC8uL3BhZ2VzL2FwaS9maW5kT25TdGFydHVwLmpzP2RkNzkiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCBzdGF0ZVNjaGVtYSBmcm9tIFwiLi4vLi4vbW9kZWwvc3RhdGVcIlxyXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gJy4uLy4uL3V0aWwvZGJjb25uZWN0JztcclxuXHJcbi8vZmluZCBhbGwgZG9jdW1lbnQgaW4gc3RhdGUgY29sbGVjdGlvbiByZXR1cm4gYW4gYXJyYXkgcmVzcG9uc2VcclxuY29uc3QgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52Lk1PTkdPX1NUUklOR1xyXG5hc3luYyBmdW5jdGlvbiBmaW5kSGFuZGxlcihyZXEsIHJlcyApIHtcclxuICAgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBxdWVyeSA9IHJlcS5xdWVyeTtcclxuICAgICAgICBjb25zdCB7IG5hbWUgfSA9IHF1ZXJ5O1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Nvbm5lY3RpbmcgdG8gbW9uZ29kYicpO1xyXG4gICAgICAgIC8vYXdhaXQgZGJDb25uZWN0KCk7XHJcbiAgICAgICAgLy9tb25nb29zZS5jb25uZWN0KGNvbm5lY3Rpb25TdHJpbmcpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Nvbm5lY3RlZCB0byBtb25nbycpO1xyXG4gICAgICAgIGxldCBTdGF0ZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBTdGF0ZSA9IG1vbmdvb3NlLm1vZGVsKFwiU3RhdGVcIik7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIFN0YXRlID0gbW9uZ29vc2UubW9kZWwoXCJTdGF0ZVwiLCBzdGF0ZVNjaGVtYSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygnUmVhZGluZyBET0NVTUVOVCcpO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGF3YWl0IFN0YXRlLmZpbmQoe1wibmFtZVwiOiBuYW1lfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjdXJyZW50U3RhdGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdBZG9wdCBET0NVTUVOVCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlcy5qc29uKGN1cnJlbnRTdGF0ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICByZXMuanNvbihlcnJvcilcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGZpbmRIYW5kbGVyXHJcblxyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJzdGF0ZVNjaGVtYSIsImRiQ29ubmVjdCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiTU9OR09fU1RSSU5HIiwiZmluZEhhbmRsZXIiLCJyZXEiLCJyZXMiLCJxdWVyeSIsIm5hbWUiLCJTdGF0ZSIsIm1vZGVsIiwiY29uc29sZSIsImxvZyIsImN1cnJlbnRTdGF0ZSIsImZpbmQiLCJqc29uIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/findOnStartup.js\n");

/***/ }),

/***/ "(api)/./util/dbconnect.js":
/*!***************************!*\
  !*** ./util/dbconnect.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* This is a database connection function*/ \n//import 'dotenv/config' \nconst connection = {}; /* creating connection object*/ \nconst connectionString = process.env.MONGO_STRING;\nasync function DbConnect(req, res) {\n    /* check if we have connection to our databse*/ if (connection.isConnected) {\n        //res.json({msg: 'connected'})\n        console.log(\"connected\");\n    }\n    /* connecting to our database */ const db = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(connectionString);\n    connection.isConnected = db.connections[0].readyState;\n    //res.json({msg: 'connect success'})\n    console.log(\"connect success\");\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlsL2RiY29ubmVjdC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5Q0FBeUMsR0FDVjtBQUMvQix5QkFBeUI7QUFFekIsTUFBTUMsVUFBVSxHQUFHLEVBQUUsRUFBRSw2QkFBNkI7QUFDcEQsTUFBTUMsZ0JBQWdCLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxZQUFZO0FBQ2pELGVBQWVDLFNBQVMsQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDakMsNkNBQTZDLEdBQzdDLElBQUlQLFVBQVUsQ0FBQ1EsV0FBVyxFQUFFO1FBQzFCLDhCQUE4QjtRQUM5QkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0tBQ3pCO0lBRUQsOEJBQThCLEdBQzlCLE1BQU1DLEVBQUUsR0FBRyxNQUFNWix1REFBZ0IsQ0FBQ0UsZ0JBQWdCLENBQUM7SUFFbkRELFVBQVUsQ0FBQ1EsV0FBVyxHQUFHRyxFQUFFLENBQUNFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsVUFBVTtJQUNyRCxvQ0FBb0M7SUFDcENMLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0NBQy9CO0FBRUQsaUVBQWVMLFNBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbWFydGhvbWUtYXBwLy4vdXRpbC9kYmNvbm5lY3QuanM/NmE0YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIGlzIGEgZGF0YWJhc2UgY29ubmVjdGlvbiBmdW5jdGlvbiovXHJcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcclxuLy9pbXBvcnQgJ2RvdGVudi9jb25maWcnIFxyXG5cclxuY29uc3QgY29ubmVjdGlvbiA9IHt9IDsvKiBjcmVhdGluZyBjb25uZWN0aW9uIG9iamVjdCovXHJcbmNvbnN0IGNvbm5lY3Rpb25TdHJpbmcgPSBwcm9jZXNzLmVudi5NT05HT19TVFJJTkc7XHJcbmFzeW5jIGZ1bmN0aW9uIERiQ29ubmVjdChyZXEsIHJlcykge1xyXG4gIC8qIGNoZWNrIGlmIHdlIGhhdmUgY29ubmVjdGlvbiB0byBvdXIgZGF0YWJzZSovXHJcbiAgaWYgKGNvbm5lY3Rpb24uaXNDb25uZWN0ZWQpIHtcclxuICAgIC8vcmVzLmpzb24oe21zZzogJ2Nvbm5lY3RlZCd9KVxyXG4gICAgY29uc29sZS5sb2coJ2Nvbm5lY3RlZCcpXHJcbiAgfVxyXG5cclxuICAvKiBjb25uZWN0aW5nIHRvIG91ciBkYXRhYmFzZSAqL1xyXG4gIGNvbnN0IGRiID0gYXdhaXQgbW9uZ29vc2UuY29ubmVjdChjb25uZWN0aW9uU3RyaW5nKVxyXG4gIFxyXG4gIGNvbm5lY3Rpb24uaXNDb25uZWN0ZWQgPSBkYi5jb25uZWN0aW9uc1swXS5yZWFkeVN0YXRlXHJcbiAgLy9yZXMuanNvbih7bXNnOiAnY29ubmVjdCBzdWNjZXNzJ30pXHJcbiAgY29uc29sZS5sb2coJ2Nvbm5lY3Qgc3VjY2VzcycpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERiQ29ubmVjdCJdLCJuYW1lcyI6WyJtb25nb29zZSIsImNvbm5lY3Rpb24iLCJjb25uZWN0aW9uU3RyaW5nIiwicHJvY2VzcyIsImVudiIsIk1PTkdPX1NUUklORyIsIkRiQ29ubmVjdCIsInJlcSIsInJlcyIsImlzQ29ubmVjdGVkIiwiY29uc29sZSIsImxvZyIsImRiIiwiY29ubmVjdCIsImNvbm5lY3Rpb25zIiwicmVhZHlTdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./util/dbconnect.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/findOnStartup.js"));
module.exports = __webpack_exports__;

})();