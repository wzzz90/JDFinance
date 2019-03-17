import Vue from 'vue';
import validate from './validate';

let directives = [
  validate
]

export default {
  install(Vue) {
    directives.forEach(directive => {
      let directiveName = directive.name || directive.NAME;

      Vue.directive(directiveName, directive)
    })
  }
}