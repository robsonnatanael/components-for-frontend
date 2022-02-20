import { FC, memo } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { Inputs } from './props';
import useStyles from './styles';

const FormTest: FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Name"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="E-mail"
        />
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange, ...fieldProps } }) => {
            return (
              <InputMask
                mask="(99) 99999-9999"
                placeholder="Telefone"
                value={value}
                onChange={onChange}
                {...fieldProps}
              >
                {(inputProps: InputMaskProps) => {
                  return <input {...inputProps} />;
                }}
              </InputMask>
            );
          }}
        />
        <input type="submit" value="Aproveitar a oferta" />
      </form>
    </div>
  );
};

export default memo(FormTest);
