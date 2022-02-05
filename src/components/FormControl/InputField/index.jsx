import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disable: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disable } = props;

  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <TextField
            onBlur={onBlur}
            onChange={onChange}
            inputRef={ref}
            label={label}
            disabled={disable}
            variant="outlined"
            margin="dense"
            value={value}
            error={!!hasError}
            helperText={errors[name]?.message}
            fullWidth
            size="small"
          />
        )}
      />
    </>
  );
}

export default InputField;
