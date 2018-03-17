class YamlToObject {
    constructor(str) {
        this.yaml = str;
        this.obj = null
    }
    get() {
        if (this.obj) {
            return this.obj;
        }
        const js_yaml = require('js-yaml');
        this.obj = js_yaml.safeLoad(this.yaml);
        return this.obj;
    }
}

module.exports = YamlToObject;
