/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import * as React from 'react';

function useForm(initFormData: any) {
  const formData: any = React.useRef({ ...initFormData });
  const [, forceUpdate] = React.useState(+new Date());

  const handleForm = React.useMemo(() => {
    // 改变表单单元
    const setFormItem = (key: string, value: any) => {
      const form: any = formData.current;
      form[key] = value;
      forceUpdate(value);
    };

    // 重置表单
    const resetForm = () => {
      const form: any = formData.current;
      for (const key in form) {
        form[key] = initFormData[key];
      }
      forceUpdate(+new Date());
    };

    return [setFormItem, resetForm];
  }, []);

  return [formData.current, ...handleForm];
}

export default useForm;
