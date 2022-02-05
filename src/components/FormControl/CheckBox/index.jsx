import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

CheckBox.propTypes = {
  form: PropTypes.object.isRequired,
  disable: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function CheckBox(props) {
  const { form, name, disable, label } = props;
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
          <FormControlLabel
            control={
              <Checkbox
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
                inputRef={ref}
                disabled={disable}
                margin="normal"
              />
            }
            label={label}
          />
        )}
      />

      {!!hasError ? (
        <p
          style={{
            color: "#d32f2f",
            fontSize: "13px",
            marginLeft: "15px",
            marginTop: "0px",
          }}
        >
          {errors[name]?.message}
        </p>
      ) : null}
    </>
  );
}

export default CheckBox;
