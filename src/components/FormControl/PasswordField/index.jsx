import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isShowPassword: PropTypes.bool.isRequired,
  disable: PropTypes.bool,
};

function PasswordField(props) {
  const { name, label, disable, form, isShowPassword } = props;
  const [isShowValue, setIsShowValue] = useState(isShowPassword);
  const {
    formState: { errors },
  } = form;
  const hasError = errors[name];
  const handleClickShowPassword = () => {
    setIsShowValue(!isShowValue);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <FormControl
            error={!!hasError}
            margin="dense"
            size="small"
            variant="outlined"
            fullWidth
            disabled={disable}
          >
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
              type={isShowValue ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!isShowValue ? (
                      <VisibilityOff color="secondary" size="small" />
                    ) : (
                      <Visibility color="primary" size="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              inputRef={ref}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
}

export default PasswordField;
