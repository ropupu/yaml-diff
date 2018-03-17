<template>
  <div class="container">
    <h1 class="mt-5">Yaml Diff</h1>
    <p class="lead">
      Yaml Diff is an online diff tool to compare differences between two yaml files.</p>
      <p>Yaml files are sorted by keys before compare.
    </p>
    <div class="row">
      <div class="col bg-light">
        <label>1</label>
        <textarea v-model="yaml1" class="form-control" rows=10></textarea>
        <p class="text-danger">{{ error1 }}</p>
      </div>
      <div class="col bg-light">
        <label>2</label>
        <textarea v-model="yaml2" class="form-control" rows=10></textarea>
        <p class="text-danger">{{ error2 }}</p>
      </div>
    </div>
    <div class="row">
      <div class="pt-1 pb-1 mx-auto">
        <button id="show-diff" v-bind:disabled="isButtonDisabled" class="btn btn-danger">Show Diff</button>
      </div>
    </div>
      <div id="diff"></div>
      <div hidden id="hidden-diff">{{ this.diff }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data : () => {
    return {
      yaml1: null,
      sorted_yaml1: null,
      error1: null,
      yaml2: null,
      sorted_yaml2: null,
      error2: null,
      diff: null
    };
  },
  mounted: function() {
    this.yaml1 = 'menu:\n  burgers:\n    - hamburger\n    - cheeseburger\n    - Big Mac\n  drinks:\n    - coke\n    - sprite'
    this.yaml2 = 'menu:\n  drinks:\n    - coke\n    - sprite\n    - hot chocolate\n  burgers:\n    - cheeseburger\n    - hamburger\n    - Big Mac'
  },
  computed: {
    isButtonDisabled: function() {
      if (this.error1 || this.error2) {
        return true;
      }
      if (!this.sorted_yaml1 || !this.sorted_yaml2) {
        return true;
      }
      return false;
    }
  },
  watch: {
    yaml1: function() {
      this.sorted_yaml1 = null;
      this.error1 = null;
      const sort = this.sortYaml(this.yaml1);
      if (sort.error) {
        this.error1 = sort.error;
        return;
      }
      this.sorted_yaml1 = sort.yaml;
    },
    yaml2: function() {
      this.sorted_yaml2 = null;
      this.error2 = null;
      const sort = this.sortYaml(this.yaml2);
      if (sort.error) {
        this.error2 = sort.error;
        return;
      }
      this.sorted_yaml2 = sort.yaml;
    },
    sorted_yaml1: function() {
      this.createDiff();
    },
    sorted_yaml2: function() {
      this.createDiff();
    }
  },
  methods: {
    sortYaml(yaml) {
      let response = {
        error: null,
        yaml: null
      };
      if (!yaml) {
        return response;
      }
      const YamlToObject = require("../classes/YamlToObject");
      const SortObject = require("../classes/SortObject");
      const ObjectToYaml = require("../classes/ObjectToYaml");
      const yto = new YamlToObject(yaml);
      try {
        yto.get();
      } catch (e) {
        console.log(e);
        response.error = e.message;
        return response;
      }
      const so = new SortObject(yto.get());
      const oty = new ObjectToYaml(so.get());
      response.yaml = oty.get();
      return response;
    },
    createDiff() {
      if (!this.sorted_yaml1 || !this.sorted_yaml2) {
        return;
      }
      const jsdiff = require('diff');
      const patch = jsdiff.createPatch('yaml', this.sorted_yaml1, this.sorted_yaml2);
      this.diff = patch;
    }
  }
};
</script>
