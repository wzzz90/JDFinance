import Validator from 'async-validator';

/**
 * Vue directive 表单项验证
 */
export default {
  NAME: 'validate',

  bind(el, binding, vnode, oldVnode) {
    el.classList.add(`v-images`)
    console.log(el)
    console.log(binding)
    console.log(vnode);

  },
  updated(el, binding, vnode, oldVnode) {
    console.log(el.value);
  },

  unbind(el, binding, vnode, oldVnode) {
    const component = vnode.componentInstance;
    let form = getForm(component);
    let modelName = getModelName(vnode, binding);

    form.removeField(modelName, component);
  }
};