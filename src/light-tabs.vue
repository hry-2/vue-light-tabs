<style scoped>
.tabs-wrapper{
  overflow: hidden;
  height: 45px;
  z-index: 2;
  background: #ffffff;
}
.tabs{
  height: 54px;
  padding: 0 2px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  
}
.tabs::-webkit-scrollbar{
  display: none;
} 
.tab{
  padding: 0 18px;
  font-size: 15px;
  line-height: 45px;
  font-weight: 500;
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
}
.tab-line{
  position: absolute;
  bottom: 9px;
  height: 2px;
  left: 27px;
  background-color: #333333;
  transition: all 0.2s;
}
</style>
<template>
  <div>
    <div class="tabs-wrapper" :style="{'background': background}">
      <div class="tabs" ref="tabs">
        <div class="tab" :style="{'color': (currentTab === index) ? activeColor : inactiveColor}" v-for="(tab, index) in tabs" :key="index" @click="clickTab(index)" :ref="tab.value || tab">
          {{tab.label || tab}}
        </div>
        <div class="tab-line" :style="{'left': tabLeft, 'width': lineWidth + 'px', 'background': lineColor }" ref="tabLine"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightTabs',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    background: {
      type: String,
      default () {
        return '#ffffff'
      }
    },
    lineColor: {
      type: String,
      default () {
        return '#333333'
      }
    },
    lineWidth: {
      type: Number,
      default () {
        return 0
      }
    },
    initTab: {
      type: Number,
      default () {
        return 0
      }
    },
    activeColor: {
      type: String,
      default () {
        return '#333333'
      }
    },
    inactiveColor: {
      type: String,
      default () {
        return '#999999'
      }
    },
  },
  data () {
    return {
      tabLeft: 0,
      currentTab: this.initTab,
      elements: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tabs.forEach((item) => {
        let value = item.value || item
        let ele = this.$refs[value][0]
        this.elements[value] = {
          width: ele.clientWidth,
          left: ele.offsetLeft
        }
      })
      this.elements['tabs'] = this.$refs['tabs']
      this.elements['tabLine'] = {
        width: this.$refs['tabLine'].clientWidth,
      }
      this.clickTab(this.currentTab, true)
    })
  },
  methods: {
    clickTab (index, isInit) {
      this.currentTab = index
      let current = this.tabs[this.currentTab].value || this.tabs[this.currentTab]
      let ele = this.elements[current]
      let tabLeft = ele.left + (ele.width - this.lineWidth) / 2
      this.tabLeft = tabLeft + 'px';
      if ((tabLeft + this.lineWidth) > this.elements['tabs'].clientWidth) {
        this.elements['tabs'].scrollLeft = ele.left
      } else if (this.elements['tabs'].scrollLeft > tabLeft) {
        this.elements['tabs'].scrollLeft = ele.left
      }
      if (!isInit) {
        this.$emit('on-change', this.currentTab)
      }
    }
  }
}
</script>