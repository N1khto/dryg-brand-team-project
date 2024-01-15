import { FieldProps } from "formik";
import Select, { OnChangeValue, Options } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Options<Option>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  isDisabled = false,
}: CustomSelectProps) => {
  const onChange = (option: OnChangeValue<Option | Option[], false>) => {
    console.log(field.name);    

    if (field.name === 'region') {
      form.initialValues.city = ''
      form.initialValues.nova_post_department = 0
    }

    if (field.name === 'city') {
      form.initialValues.nova_post_department = 0
    }

  
    
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };


  if (isDisabled) {
    return (
      <Select
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        className={`react-select-container  ${className}`}
        classNamePrefix="react-select"
        isDisabled
      />
    );
  }
  

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      className={`react-select-container  ${className}`}
      classNamePrefix="react-select"
    />
  );
};

export default CustomSelect;
