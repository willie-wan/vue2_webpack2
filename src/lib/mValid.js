import Vue from 'vue'
import VeeValidate,{Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Validator.addLocale(zh_CN);
Vue.use(VeeValidate,{
    locale:"zh_CN",
    events:""
});

// 修改内置验证规则提示文字
const dictionary = {
    zh_CN: {
        messages: {
            required: (a,b) => b[0]+"不能为空"
        }
    }
};

Validator.updateDictionary(dictionary);

// 自定义验证规则
Validator.extend('mobile', {
    messages: {
      zh_CN:(filed,args) => args[0] + '必须是11位手机号码',
    },
    validate: value => {
      return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
});

export default Validator;