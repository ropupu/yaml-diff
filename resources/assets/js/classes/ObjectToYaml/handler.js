class ObjectToYaml {
    constructor(obj) {
        this.obj = obj;
        this.yaml = null;
    }
    get() {
        if (this.yaml) {
            return this.yaml;
        }
        const js_yaml = require('js-yaml');
        this.yaml = js_yaml.safeDump(this.obj, {'sortKeys': true});
        return this.yaml;
    }
}

module.exports = ObjectToYaml;
