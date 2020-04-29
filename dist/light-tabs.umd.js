(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.LightTabs = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'LightTabs',
    props: {
      tabs: {
        type: Array,
        default: function default$1 () {
          return []
        }
      },
      background: {
        type: String,
        default: function default$2 () {
          return '#ffffff'
        }
      },
      lineColor: {
        type: String,
        default: function default$3 () {
          return '#333333'
        }
      },
      lineWidth: {
        type: Number,
        default: function default$4 () {
          return 0
        }
      },
      initTab: {
        type: Number,
        default: function default$5 () {
          return 0
        }
      },
      activeColor: {
        type: String,
        default: function default$6 () {
          return '#333333'
        }
      },
      inactiveColor: {
        type: String,
        default: function default$7 () {
          return '#999999'
        }
      },
    },
    data: function data () {
      return {
        tabLeft: 0,
        currentTab: this.initTab,
        elements: {}
      }
    },
    mounted: function mounted () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.tabs.forEach(function (item) {
          var value = item.value || item;
          var ele = this$1.$refs[value][0];
          this$1.elements[value] = {
            width: ele.clientWidth,
            left: ele.offsetLeft
          };
        });
        this$1.elements['tabs'] = this$1.$refs['tabs'];
        this$1.elements['tabLine'] = {
          width: this$1.$refs['tabLine'].clientWidth,
        };
        this$1.clickTab(this$1.currentTab, true);
      });
    },
    methods: {
      clickTab: function clickTab (index, isInit) {
        this.currentTab = index;
        var current = this.tabs[this.currentTab].value || this.tabs[this.currentTab];
        var ele = this.elements[current];
        var tabLeft = ele.left + (ele.width - this.lineWidth) / 2;
        this.tabLeft = tabLeft + 'px';
        if ((tabLeft + this.lineWidth) > this.elements['tabs'].clientWidth) {
          this.elements['tabs'].scrollLeft = ele.left;
        } else if (this.elements['tabs'].scrollLeft > tabLeft) {
          this.elements['tabs'].scrollLeft = ele.left;
        }
        if (!isInit) {
          this.$emit('on-change', this.currentTab);
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _c(
        "div",
        { staticClass: "tabs-wrapper", style: { background: _vm.background } },
        [
          _c(
            "div",
            { ref: "tabs", staticClass: "tabs" },
            [
              _vm._l(_vm.tabs, function(tab, index) {
                return _c(
                  "div",
                  {
                    key: index,
                    ref: tab.value || tab,
                    refInFor: true,
                    staticClass: "tab",
                    style: {
                      color:
                        _vm.currentTab === index
                          ? _vm.activeColor
                          : _vm.inactiveColor
                    },
                    on: {
                      click: function($event) {
                        return _vm.clickTab(index)
                      }
                    }
                  },
                  [_vm._v("\n        " + _vm._s(tab.label || tab) + "\n      ")]
                )
              }),
              _vm._v(" "),
              _c("div", {
                ref: "tabLine",
                staticClass: "tab-line",
                style: {
                  left: _vm.tabLeft,
                  width: _vm.lineWidth + "px",
                  background: _vm.lineColor
                }
              })
            ],
            2
          )
        ]
      )
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-4167b7e7_0", { source: "\n.tabs-wrapper[data-v-4167b7e7]{\n  overflow: hidden;\n  height: 45px;\n  z-index: 2;\n  background: #ffffff;\n}\n.tabs[data-v-4167b7e7]{\n  height: 54px;\n  padding: 0 2px;\n  white-space: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n  -webkit-overflow-scrolling: touch;\n  position: relative;\n}\n.tabs[data-v-4167b7e7]::-webkit-scrollbar{\n  display: none;\n}\n.tab[data-v-4167b7e7]{\n  padding: 0 18px;\n  font-size: 15px;\n  line-height: 45px;\n  font-weight: 500;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n}\n.tab-line[data-v-4167b7e7]{\n  position: absolute;\n  bottom: 9px;\n  height: 2px;\n  left: 27px;\n  background-color: #333333;\n  transition: all 0.2s;\n}\n", map: {"version":3,"sources":["/Users/huangruiyun/Github/hry-2/vue-light-tabs/src/light-tabs.vue"],"names":[],"mappings":";AACA;EACA,gBAAA;EACA,YAAA;EACA,UAAA;EACA,mBAAA;AACA;AACA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,iCAAA;EACA,kBAAA;AAEA;AACA;EACA,aAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;EACA,eAAA;AACA;AACA;EACA,kBAAA;EACA,WAAA;EACA,WAAA;EACA,UAAA;EACA,yBAAA;EACA,oBAAA;AACA","file":"light-tabs.vue","sourcesContent":["<style scoped>\n.tabs-wrapper{\n  overflow: hidden;\n  height: 45px;\n  z-index: 2;\n  background: #ffffff;\n}\n.tabs{\n  height: 54px;\n  padding: 0 2px;\n  white-space: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n  -webkit-overflow-scrolling: touch;\n  position: relative;\n  \n}\n.tabs::-webkit-scrollbar{\n  display: none;\n} \n.tab{\n  padding: 0 18px;\n  font-size: 15px;\n  line-height: 45px;\n  font-weight: 500;\n  display: inline-block;\n  vertical-align: top;\n  cursor: pointer;\n}\n.tab-line{\n  position: absolute;\n  bottom: 9px;\n  height: 2px;\n  left: 27px;\n  background-color: #333333;\n  transition: all 0.2s;\n}\n</style>\n<template>\n  <div>\n    <div class=\"tabs-wrapper\" :style=\"{'background': background}\">\n      <div class=\"tabs\" ref=\"tabs\">\n        <div class=\"tab\" :style=\"{'color': (currentTab === index) ? activeColor : inactiveColor}\" v-for=\"(tab, index) in tabs\" :key=\"index\" @click=\"clickTab(index)\" :ref=\"tab.value || tab\">\n          {{tab.label || tab}}\n        </div>\n        <div class=\"tab-line\" :style=\"{'left': tabLeft, 'width': lineWidth + 'px', 'background': lineColor }\" ref=\"tabLine\"></div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'LightTabs',\n  props: {\n    tabs: {\n      type: Array,\n      default () {\n        return []\n      }\n    },\n    background: {\n      type: String,\n      default () {\n        return '#ffffff'\n      }\n    },\n    lineColor: {\n      type: String,\n      default () {\n        return '#333333'\n      }\n    },\n    lineWidth: {\n      type: Number,\n      default () {\n        return 0\n      }\n    },\n    initTab: {\n      type: Number,\n      default () {\n        return 0\n      }\n    },\n    activeColor: {\n      type: String,\n      default () {\n        return '#333333'\n      }\n    },\n    inactiveColor: {\n      type: String,\n      default () {\n        return '#999999'\n      }\n    },\n  },\n  data () {\n    return {\n      tabLeft: 0,\n      currentTab: this.initTab,\n      elements: {}\n    }\n  },\n  mounted () {\n    this.$nextTick(() => {\n      this.tabs.forEach((item) => {\n        let value = item.value || item\n        let ele = this.$refs[value][0]\n        this.elements[value] = {\n          width: ele.clientWidth,\n          left: ele.offsetLeft\n        }\n      })\n      this.elements['tabs'] = this.$refs['tabs']\n      this.elements['tabLine'] = {\n        width: this.$refs['tabLine'].clientWidth,\n      }\n      this.clickTab(this.currentTab, true)\n    })\n  },\n  methods: {\n    clickTab (index, isInit) {\n      this.currentTab = index\n      let current = this.tabs[this.currentTab].value || this.tabs[this.currentTab]\n      let ele = this.elements[current]\n      let tabLeft = ele.left + (ele.width - this.lineWidth) / 2\n      this.tabLeft = tabLeft + 'px';\n      if ((tabLeft + this.lineWidth) > this.elements['tabs'].clientWidth) {\n        this.elements['tabs'].scrollLeft = ele.left\n      } else if (this.elements['tabs'].scrollLeft > tabLeft) {\n        this.elements['tabs'].scrollLeft = ele.left\n      }\n      if (!isInit) {\n        this.$emit('on-change', this.currentTab)\n      }\n    }\n  }\n}\n</script>"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-4167b7e7";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('LightTabs', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
