import { cn } from '@/lib/utils';

type FormInputProps = {
  label: string;
  name: string;
  error: string | undefined;
  register: any;
  type: 'text' | 'password';
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  error,
  register,
}) => (
  <label htmlFor={name} className="form-control w-full block">
    <div className="label">
      <span
        className={cn('label-text', {
          'text-error': error,
        })}
      >
        {label}
      </span>
    </div>
    <input
      className={cn('input input-bordered w-full', {
        'input-error': error,
      })}
      type={type}
      id={name}
      {...register(name)}
    />
    {error && (
      <div className="label">
        <span className="label-text-alt text-error">{error}</span>
      </div>
    )}
  </label>
);

export { FormInput };
