class SortObject {
    constructor(obj) {
        this.obj = obj;
        this.sorted_obj = null;
    }
    get() {
        if (this.sorted_obj) {
            return this.sorted_obj;
        }
        this.sorted_obj = this.sort(this.obj);
        return this.sorted_obj;
    }
    sort(obj) {
        let sorted = {};
        let keys = Object.keys(obj);
        keys.sort();
        const self = this;
        let value = null;
        keys.forEach(function(key) {
            value = obj[key];
            if (typeof(value) === "object" && !Array.isArray(value)) {
                value = self.sort(value);
            }
            if (Array.isArray(value)) {
                value.sort();
            }
            sorted[key] = value;
        })
        return sorted;
    }
}

module.exports = SortObject;
