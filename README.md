# vue-light-tabs

> Simple tabs component for Vue

- install：
```javascript
  npm install vue-light-tabs --save
```

- usage：

```javascript
  <LightTabs></LightTabs>
```

```javascript
  import LightTabs from './vue-light-tabs.vue'
  ...
  components: {
    LightTabs
  }
  ...
```
- API

|  props   | description  | type | default |
|  ----  | ----  | ----  | ----  |
| tabs  | tabs data list。eg: ['tab1', 'tab2'] | Array  | []  |
| background  | tabs background color | String  | #ffffff  |
| lineColor  | tab underline color | String  | #333333  |
| lineWidth  | tab underline width. no underline if it equals 0 | Number  | 0  |
| initTab  | initial active tab index | Number  | 0  |
| activeColor  | active tab color | String  | #333333  |
| inactiveColor  | inactive tab color | String  | #999999  |

- Events
|  props   | description  | return |
|  ----  | ----  | ----  | ----  |
| on-change  | click tab event | active tab index  |