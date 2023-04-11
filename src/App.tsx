import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ReactSelect from 'react-select';
import MaskedInput from 'react-input-mask';

import { Inputs, IOption } from './types';
import cn from './form.module.scss';
import './select.scss';

const options: IOption[] = [
  { value: 'USA', label: 'usa' },
  { value: 'UK', label: 'uk' },
  { value: 'CANADA', label: 'canada' },
  { value: 'TEST', label: 'test' },
  { value: 'JAPAN', label: 'japan' },
  { value: 'AUSTALIA', label: 'australia' },
];

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
    reset();
  };

  const getValue = (value: string) => {
    return value ? options.find((option) => option.value === value) : '';
  };

  return (
    <div className="App">
      <form className={cn.form} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cn.formTitle}>Заказать ообратный звонок</h3>

        <label className={cn.formLabel}>
          <span className={cn.formSpan}>Ваше имя*:</span>
          <input
            className={cn.formSpan}
            {...register('fullname', {
              required: true,
              maxLength: 80,
              minLength: 1,
              pattern: /^[A-Za-zА-Яа-я ]+$/i,
            })}
            placeholder="Имя"
            type="name"
            name="fullname"
          />
          {errors?.fullname && <p className={cn.formP}>Только буквы и не менее 1 символа</p>}
        </label>
        <label className={cn.formLabel}>
          <span className={cn.formSpan}>Ваш телефон*:</span>
          <MaskedInput
            mask={'+7 (999) 999-99-99'}
            alwaysShowMask={false}
            type={'tel'}
            placeholder="+7 (999) 999-99-99"
            {...register('phone', { required: true })}
          />
          {errors?.phone && <p className={cn.formP}>Введите телефон</p>}
        </label>
        <label className={cn.formLabel}>
          <span className={cn.formSpan}>Ваша почта:</span>
          <input
            className={cn.formInput}
            {...register('email', {
              maxLength: 40,
              minLength: 2,
            })}
            placeholder="Email"
            type="email"
            name="email"
          />
        </label>
        <Controller
          control={control}
          name="countries"
          rules={{ required: 'Выберите страну' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <ReactSelect
              classNamePrefix="select"
              placeholder="Countries"
              options={options}
              value={getValue(value)}
              onChange={(newValue) => onChange((newValue as IOption).value)}
            />
          )}
        />
        {errors?.countries && <p className={cn.formP}>Выберите страну</p>}
        <label className={cn.formLabel}>
          <span className={cn.formSpan}>Ваше сообщение:</span>
          <textarea
            className={cn.formTextarea}
            {...register('message', {
              maxLength: 2000,
              minLength: 2,
            })}
            placeholder="Сообщение"
            name="message"
          />
        </label>
        <input className={cn.formBtn} type="submit" />
      </form>
    </div>
  );
}

export default App;
