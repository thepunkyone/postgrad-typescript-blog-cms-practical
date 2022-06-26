"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const conf = (0, config_1.default)();
app_1.default.listen(conf.port, () => {
    console.log(`app is listening on port ${conf.port}`);
});
//# sourceMappingURL=index.js.map