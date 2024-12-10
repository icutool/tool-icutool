<template>
  <div class="converter">
    <h1>YAML Properties相互转换</h1>

    <div class="conversion-container">
      <!-- YAML input/output -->
      <div class="input-section">
        <label for="yaml-text">YAML:</label>
        <textarea
          id="yaml-text"
          v-model="yamlText"
          @input="convertYamlToProperties"
          placeholder="粘贴Yaml内容到这儿"
        ></textarea>
      </div>

      <!-- Properties input/output -->
      <div class="input-section">
        <label for="properties-text">Properties:</label>
        <textarea
          id="properties-text"
          v-model="propertiesText"
          @input="convertPropertiesToYaml"
          placeholder="粘贴Properties内容到这儿"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import YAML from "yaml";

export default {
  metaInfo() {
        return {
            title: 'Yaml转换Properties - icutool编程工具',
            meta: [
                { name: 'description', content: '支持Yaml转换Properties以及Properties转换Yaml - icutool编程工具' },
                { name: 'keywords', content: 'Yaml转换, Properties转换, Yaml转换Properties, Properties转换Yaml, 网络工具, 程序员工具, icutool' },
                { name: 'author', content: 'icutool' },
                { name: 'robots', content: 'index, follow' },
                { property: 'og:title', content: 'Yaml转换Properties - icutool编程工具' },
                { property: 'og:description', content: '支持Yaml转换Properties以及Properties转换Yaml - icutool编程工具' },
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: window.location.href }
            ]
        };
    },
  data() {
    return {
      yamlText: "",
      propertiesText: "",
      isUpdatingYaml: false,
      isUpdatingProperties: false,
    };
  },
  methods: {
    convertYamlToProperties() {
      if (this.isUpdatingProperties) return;
      this.isUpdatingYaml = true;
      try {
        const yamlObj = YAML.parse(this.yamlText);
        this.propertiesText = this.toProperties(yamlObj);
      } catch (error) {
        // Silent fail on invalid input
      }
      this.isUpdatingYaml = false;
    },
    convertPropertiesToYaml() {
      if (this.isUpdatingYaml) return;
      this.isUpdatingProperties = true;
      try {
        const lines = this.propertiesText.split("\n");
        const yamlObj = {};
        for (const line of lines) {
          if (!line.trim() || line.trim().startsWith("#")) continue;
          const [key, ...value] = line.split("=");
          const path = key.trim().split(".");
          let current = yamlObj;
          for (let i = 0; i < path.length - 1; i++) {
            const part = path[i];
            current[part] = current[part] || {};
            current = current[part];
          }
          current[path[path.length - 1]] = value.join("=").trim();
        }
        this.yamlText = YAML.stringify(yamlObj);
      } catch (error) {
        // Silent fail on invalid input
      }
      this.isUpdatingProperties = false;
    },
    toProperties(obj, parentKey = "", result = []) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          if (typeof value === "object" && value !== null) {
            this.toProperties(value, newKey, result);
          } else {
            result.push(`${newKey}=${value}`);
          }
        }
      }
      return result.join("\n");
    },
  },
};
</script>

<style scoped>
.converter {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.conversion-container {
  display: flex;
  gap: 20px;
}

.input-section {
  flex: 1;
}

textarea {
  width: 100%;
  height: 400px;
  margin: 10px 0;
  padding: 10px;
  font-size: 14px;
  font-family: monospace;
}
</style>