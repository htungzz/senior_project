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
exports.id = "pages/api/socket";
exports.ids = ["pages/api/socket"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

module.exports = import("socket.io");;

/***/ }),

/***/ "(api)/./model/log.js":
/*!**********************!*\
  !*** ./model/log.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst logSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    state: String,\n    sensor: String\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9tb2RlbC9sb2cuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXlDO0FBS3pDLE1BQU1FLFNBQVMsR0FBRyxJQUFJRiw0Q0FBTSxDQUN4QjtJQUNJRyxLQUFLLEVBQUVDLE1BQU07SUFDYkMsTUFBTSxFQUFFRCxNQUFNO0NBQ2pCLENBQ0o7QUFJRCxpRUFBZUYsU0FBUyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc21hcnRob21lLWFwcC8uL21vZGVsL2xvZy5qcz85MzkwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjaGVtYSwgbW9kZWwgfSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5cclxuXHJcblxyXG5jb25zdCBsb2dTY2hlbWEgPSBuZXcgU2NoZW1hKFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRlOiBTdHJpbmcsXHJcbiAgICAgICAgc2Vuc29yOiBTdHJpbmdcclxuICAgIH1cclxuKTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9nU2NoZW1hOyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb2RlbCIsImxvZ1NjaGVtYSIsInN0YXRlIiwiU3RyaW5nIiwic2Vuc29yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./model/log.js\n");

/***/ }),

/***/ "(api)/./pages/api/socket.js":
/*!*****************************!*\
  !*** ./pages/api/socket.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _model_log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/log */ \"(api)/./model/log.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([socket_io__WEBPACK_IMPORTED_MODULE_0__]);\nsocket_io__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst SocketHandler = async (req, res)=>{\n    if (res.socket.server.io) {\n        console.log(\"Socket is already running\");\n    } else {\n        //console.log('connecting to mongodb');\n        //await dbConnect();\n        //console.log('connected to mongo');\n        let State;\n        try {\n            State = mongoose__WEBPACK_IMPORTED_MODULE_1___default().model(\"State\");\n        } catch  {\n            State = mongoose__WEBPACK_IMPORTED_MODULE_1___default().model(\"State\", _model_log__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n        }\n        console.log(\"Socket is initializing\");\n        const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(res.socket.server);\n        res.socket.server.io = io;\n        io.on(\"connection\", (socket)=>{\n            console.log(socket.id);\n        });\n        const changeStream = State.watch();\n        changeStream.on(\"change\", async (change)=>{\n            try {\n                //console.log(change);\n                var check = checkObjectID(String(change.documentKey._id));\n                var result = {\n                    sensor: check,\n                    state: change.updateDescription.updatedFields.state\n                };\n                //console.log(result.id)\n                io.emit(\"changeData\", result);\n            } catch (error) {\n                throw error;\n            }\n        });\n    }\n    res.end();\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketHandler);\nfunction checkObjectID(result) {\n    switch(result){\n        case process.env.CO2_OBJECTID:\n            return \"co2\";\n        case process.env.TEMP_OBJECTID:\n            return \"temp\";\n        case process.env.HUMID_OBJECTID:\n            return \"humid\";\n        case process.env.DOOR_OBJECTID:\n            return \"door\";\n        case process.env.KIT_OBJECTID:\n            return \"kitdoor\";\n        case process.env.HALLWAY_OBJECTID:\n            return \"hallway\";\n        case process.env.LIVING_OBJECTID:\n            return \"living\";\n        case process.env.DINING_OBJECTID:\n            return \"dining\";\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc29ja2V0LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ0g7QUFDVTtBQUl6QyxNQUFNRyxhQUFhLEdBQUcsT0FBT0MsR0FBRyxFQUFFQyxHQUFHLEdBQUs7SUFDdEMsSUFBSUEsR0FBRyxDQUFDQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0MsRUFBRSxFQUFFO1FBQ3RCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztLQUMzQyxNQUFNO1FBQ0gsdUNBQXVDO1FBQ3ZDLG9CQUFvQjtRQUNwQixvQ0FBb0M7UUFDcEMsSUFBSUMsS0FBSztRQUNULElBQUk7WUFDQUEsS0FBSyxHQUFHVixxREFBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25DLENBQUMsT0FBTTtZQUNKVSxLQUFLLEdBQUdWLHFEQUFjLENBQUMsT0FBTyxFQUFFQyxrREFBVyxDQUFDLENBQUM7U0FDaEQ7UUFDRE8sT0FBTyxDQUFDQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7UUFDckMsTUFBTUYsRUFBRSxHQUFHLElBQUlSLDZDQUFNLENBQUNLLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDQyxNQUFNLENBQUM7UUFDeENGLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDQyxNQUFNLENBQUNDLEVBQUUsR0FBR0EsRUFBRTtRQUN6QkEsRUFBRSxDQUFDSyxFQUFFLENBQUMsWUFBWSxFQUFFUCxDQUFBQSxNQUFNLEdBQUk7WUFDMUJHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSixNQUFNLENBQUNRLEVBQUUsQ0FBQztTQUN6QixDQUFDO1FBQ0YsTUFBTUMsWUFBWSxHQUFHSixLQUFLLENBQUNLLEtBQUssRUFBRTtRQUNsQ0QsWUFBWSxDQUFDRixFQUFFLENBQUMsUUFBUSxFQUFFLE9BQU9JLE1BQU0sR0FBSztZQUN4QyxJQUFJO2dCQUNBLHNCQUFzQjtnQkFDdEIsSUFBSUMsS0FBSyxHQUFHQyxhQUFhLENBQUNDLE1BQU0sQ0FBQ0gsTUFBTSxDQUFDSSxXQUFXLENBQUNDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJQyxNQUFNLEdBQUc7b0JBQ1RDLE1BQU0sRUFBR04sS0FBSztvQkFDZE8sS0FBSyxFQUFFUixNQUFNLENBQUNTLGlCQUFpQixDQUFDQyxhQUFhLENBQUNGLEtBQUs7aUJBQ3REO2dCQUNELHdCQUF3QjtnQkFDeEJqQixFQUFFLENBQUNvQixJQUFJLENBQUMsWUFBWSxFQUFFTCxNQUFNLENBQUM7YUFDaEMsQ0FBQyxPQUFPTSxLQUFLLEVBQUU7Z0JBQ1osTUFBTUEsS0FBSzthQUNkO1NBQ0osQ0FBQztLQUNMO0lBRUR4QixHQUFHLENBQUN5QixHQUFHLEVBQUU7Q0FDWjtBQUVELGlFQUFlM0IsYUFBYTtBQUU1QixTQUFTZ0IsYUFBYSxDQUFDSSxNQUFNLEVBQUU7SUFDM0IsT0FBUUEsTUFBTTtRQUNWLEtBQU1RLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxZQUFZO1lBQzFCLE9BQU8sS0FBSztRQUNoQixLQUFNRixPQUFPLENBQUNDLEdBQUcsQ0FBQ0UsYUFBYTtZQUMzQixPQUFPLE1BQU07UUFDakIsS0FBTUgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLGNBQWM7WUFDNUIsT0FBTyxPQUFPO1FBQ2xCLEtBQU1KLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSSxhQUFhO1lBQzNCLE9BQU8sTUFBTTtRQUNqQixLQUFNTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ssWUFBWTtZQUMxQixPQUFPLFNBQVM7UUFDcEIsS0FBTU4sT0FBTyxDQUFDQyxHQUFHLENBQUNNLGdCQUFnQjtZQUM5QixPQUFPLFNBQVM7UUFDcEIsS0FBTVAsT0FBTyxDQUFDQyxHQUFHLENBQUNPLGVBQWU7WUFDN0IsT0FBTyxRQUFRO1FBQ25CLEtBQU1SLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUSxlQUFlO1lBQzdCLE9BQU8sUUFBUTtLQUV0QjtDQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc21hcnRob21lLWFwcC8uL3BhZ2VzL2FwaS9zb2NrZXQuanM/OTM1YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdzb2NrZXQuaW8nXHJcbmltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSdcclxuaW1wb3J0IHN0YXRlU2NoZW1hIGZyb20gJy4uLy4uL21vZGVsL2xvZydcclxuXHJcblxyXG5cclxuY29uc3QgU29ja2V0SGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgaWYgKHJlcy5zb2NrZXQuc2VydmVyLmlvKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NvY2tldCBpcyBhbHJlYWR5IHJ1bm5pbmcnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdjb25uZWN0aW5nIHRvIG1vbmdvZGInKTtcclxuICAgICAgICAvL2F3YWl0IGRiQ29ubmVjdCgpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2Nvbm5lY3RlZCB0byBtb25nbycpO1xyXG4gICAgICAgIGxldCBTdGF0ZTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBTdGF0ZSA9IG1vbmdvb3NlLm1vZGVsKFwiU3RhdGVcIik7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgIFN0YXRlID0gbW9uZ29vc2UubW9kZWwoXCJTdGF0ZVwiLCBzdGF0ZVNjaGVtYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTb2NrZXQgaXMgaW5pdGlhbGl6aW5nJylcclxuICAgICAgICBjb25zdCBpbyA9IG5ldyBTZXJ2ZXIocmVzLnNvY2tldC5zZXJ2ZXIpXHJcbiAgICAgICAgcmVzLnNvY2tldC5zZXJ2ZXIuaW8gPSBpb1xyXG4gICAgICAgIGlvLm9uKCdjb25uZWN0aW9uJywgc29ja2V0ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc29ja2V0LmlkKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgY2hhbmdlU3RyZWFtID0gU3RhdGUud2F0Y2goKTtcclxuICAgICAgICBjaGFuZ2VTdHJlYW0ub24oJ2NoYW5nZScsIGFzeW5jIChjaGFuZ2UpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coY2hhbmdlKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGVjayA9IGNoZWNrT2JqZWN0SUQoU3RyaW5nKGNoYW5nZS5kb2N1bWVudEtleS5faWQpKVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzZW5zb3IgOiBjaGVjayxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogY2hhbmdlLnVwZGF0ZURlc2NyaXB0aW9uLnVwZGF0ZWRGaWVsZHMuc3RhdGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0LmlkKVxyXG4gICAgICAgICAgICAgICAgaW8uZW1pdCgnY2hhbmdlRGF0YScsIHJlc3VsdClcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlcy5lbmQoKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTb2NrZXRIYW5kbGVyXHJcblxyXG5mdW5jdGlvbiBjaGVja09iamVjdElEKHJlc3VsdCkge1xyXG4gICAgc3dpdGNoIChyZXN1bHQpIHtcclxuICAgICAgICBjYXNlIChwcm9jZXNzLmVudi5DTzJfT0JKRUNUSUQpOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJjbzJcIlxyXG4gICAgICAgIGNhc2UgKHByb2Nlc3MuZW52LlRFTVBfT0JKRUNUSUQpOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZW1wXCJcclxuICAgICAgICBjYXNlIChwcm9jZXNzLmVudi5IVU1JRF9PQkpFQ1RJRCk6XHJcbiAgICAgICAgICAgIHJldHVybiBcImh1bWlkXCJcclxuICAgICAgICBjYXNlIChwcm9jZXNzLmVudi5ET09SX09CSkVDVElEKTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZG9vclwiXHJcbiAgICAgICAgY2FzZSAocHJvY2Vzcy5lbnYuS0lUX09CSkVDVElEKTpcclxuICAgICAgICAgICAgcmV0dXJuIFwia2l0ZG9vclwiXHJcbiAgICAgICAgY2FzZSAocHJvY2Vzcy5lbnYuSEFMTFdBWV9PQkpFQ1RJRCk6XHJcbiAgICAgICAgICAgIHJldHVybiBcImhhbGx3YXlcIlxyXG4gICAgICAgIGNhc2UgKHByb2Nlc3MuZW52LkxJVklOR19PQkpFQ1RJRCk6XHJcbiAgICAgICAgICAgIHJldHVybiBcImxpdmluZ1wiXHJcbiAgICAgICAgY2FzZSAocHJvY2Vzcy5lbnYuRElOSU5HX09CSkVDVElEKTpcclxuICAgICAgICAgICAgcmV0dXJuIFwiZGluaW5nXCJcclxuICAgICAgICBcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJTZXJ2ZXIiLCJtb25nb29zZSIsInN0YXRlU2NoZW1hIiwiU29ja2V0SGFuZGxlciIsInJlcSIsInJlcyIsInNvY2tldCIsInNlcnZlciIsImlvIiwiY29uc29sZSIsImxvZyIsIlN0YXRlIiwibW9kZWwiLCJvbiIsImlkIiwiY2hhbmdlU3RyZWFtIiwid2F0Y2giLCJjaGFuZ2UiLCJjaGVjayIsImNoZWNrT2JqZWN0SUQiLCJTdHJpbmciLCJkb2N1bWVudEtleSIsIl9pZCIsInJlc3VsdCIsInNlbnNvciIsInN0YXRlIiwidXBkYXRlRGVzY3JpcHRpb24iLCJ1cGRhdGVkRmllbGRzIiwiZW1pdCIsImVycm9yIiwiZW5kIiwicHJvY2VzcyIsImVudiIsIkNPMl9PQkpFQ1RJRCIsIlRFTVBfT0JKRUNUSUQiLCJIVU1JRF9PQkpFQ1RJRCIsIkRPT1JfT0JKRUNUSUQiLCJLSVRfT0JKRUNUSUQiLCJIQUxMV0FZX09CSkVDVElEIiwiTElWSU5HX09CSkVDVElEIiwiRElOSU5HX09CSkVDVElEIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/socket.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/socket.js"));
module.exports = __webpack_exports__;

})();