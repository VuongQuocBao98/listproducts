import React from "react";
import PropTypes from "prop-types";
import InputField from "../../../../components/FormControl/InputField";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const schema = yup
    .object({
      title: yup
        .string()
        .required("khong duoc de trong title")
        .min(3, "tieu de ko duoi 2 ki tu")
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$/,
          "ko dung form"
        ),
    })
    .required();

  const { onSubmit } = props;
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="title" label="title Name" form={form} />
    </form>
  );
}

export default TodoForm;
