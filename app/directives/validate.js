import Validator from 'async-validator';

const ERRORS = {
  maxLength: '超过最大长度$LENGTH$',
  minLength: '长度不得少于$LENGTH$',
  max: '超过允许的最大值$RANGE$',
  min: '不得小于最小值$RANGE$',
  required: '必填项',
  number: '必须为数字',
  mail: '请输入正确的邮箱名',
  email: '请输入正确的邮箱名',
  mobile: '请输入正确的手机号码',
  phone: '请输入正确的手机号码',
  tel: '请输入正确的手机号',
  date: '日期格式不正确',
  datetime: '时间格式不正确',
  time: '时间格式不正确',
  integer: '整数格式不正确'
};

/**
 * 获取表单项的 model name
 * @param vnode
 * @return {String}
 */
function getModelName(vnode) {
  const arr = vnode.data.directives;
  const data = arr.find(item => item.name == 'model');

  let prop = data.expression.split('.')[1];

  return prop;
}

/**
 * 获取表单组件
 * @param component
 * @return {*}
 */
function getForm(vnode) {
  let parent;

  parent = vnode.elm.parentNode;
  if(!parent.dataset.attrName) {
    parent = parent.parentNode;
  } else {
    parent = vnode.elm.parentNode;
  }
  console.log(parent);

  return parent;
}

function getRules(el) {
  const type = el.type;

  let rules = [];
  switch (type) {
    case 'tel':
      if (el.required) {
        rules.push({
          message: ERRORS.required,
          required: el.required
        });
      }

      rules.push({
        pattern: /^[\d\*\-\(\)\s\#\+]{1,30}$/,
        message: ERRORS.tel
      });
      break;
  
    default:
      break;
  }

  return rules;
}

function validate (el, rules, vnode) {
  const fieldName = getModelName(vnode);
  const component = el;
  const descriptor = {
    [fieldName]: rules
  };
  const validator = new Validator(descriptor);
  let model = {};
  let value = el.value;
  model[fieldName] = value;
  console.log(model)
  return new Promise((resolve, reject) => {
    validator.validate(model, { firstFields: true }, errors => {
      if (errors) {
        component.validateState = 'error';
        component.tempErrorText = component.errorMsg = errors[0].message;
        reject(errors);
      } else {
        component.validateState = 'success';
        component.tempErrorText = component.errorMsg = '';
        resolve();
      }
      component.$emit('validate', errors);
    });
  });
}


/**
 * Vue directive 表单项验证
 */
export default {
  NAME: 'validate',

  bind(el, binding, vnode) {
    let modelName = getModelName(vnode);
    let rules = getRules(el);
    let form;
    setTimeout(() => {
      form = getForm(vnode);

      el.validate = () => {
        return validate(el, rules, vnode);
      };

      form.addField(modelName, el);
    }, 1);
    
    
    
  },
  updated(el, binding, vnode, oldVnode) {
    console.log(el.value);
  },

  unbind(el, binding, vnode, oldVnode) {
    // const component = vnode.componentInstance;
    // let form = getForm(component);
    // let modelName = getModelName(vnode, binding);

    // form.removeField(modelName, component);
  }
};