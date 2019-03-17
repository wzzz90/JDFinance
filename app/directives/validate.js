import Validator from 'async-validator';

/**
 * Vue directive 表单项验证
 */
export default {
  NAME: 'validate',

  bind(el, binding, vnode, oldVnode) {
    console.log(el)
    console.log(binding);
    console.log(vnode);
    console.log(oldVnode);
    console.log(binding.value)
  },

  unbind(el, binding, vnode, oldVnode) {

  }
};