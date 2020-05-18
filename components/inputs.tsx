import React from "react";

type InputProps = {
  label: string;
};

const Input = ({
  label,
  ...attrs
}: InputProps & React.HTMLProps<HTMLInputElement>): JSX.Element => (
  <label className="text-sm font-bold text-gray-600 uppercase">
    {label}
    <input
      className="block w-full mt-1 mb-4 text-gray-800 form-input"
      {...attrs}
    />
  </label>
);

export const EmailInput = (
  props: InputProps | React.HTMLProps<HTMLInputElement>
): JSX.Element => (
  <Input
    label="Email Address"
    name="email"
    type="email"
    autoComplete="username"
    {...props}
  />
);

export const PasswordInput = (
  props: InputProps | React.HTMLProps<HTMLInputElement>
): JSX.Element => (
  <Input
    label="Password"
    name="password"
    type="password"
    autoComplete="current-password"
    {...props}
  />
);
