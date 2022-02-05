import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

NumberField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,

  disable: PropTypes.bool,
};

function NumberField(props) {
  const { name, label, disable, form } = props;

  const {
    formState: { errors },
    setValue,
  } = form;
  const hasError = errors[name];

  return (
    <Box>
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
            sx={{
              maxWidth: "150px",
              marginRight: "10px",
              position: "relative",
            }}
          >
            <Typography
              component="div"
              sx={{ fontWeight: "bold", position: "absolute", top: "-50%" }}
            >
              {label}
            </Typography>
            <Box>
              <Box sx={{ display: "flex" }}>
                <IconButton
                  onClick={() =>
                    Number.parseInt(value) <= 1
                      ? setValue(name, 1)
                      : setValue(name, Number.parseInt(value) - 1)
                  }
                >
                  <RemoveCircleIcon />
                </IconButton>
                <Box>
                  <OutlinedInput
                    type="number"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value < 1 ? 1 : value}
                    inputRef={ref}
                  />
                </Box>
                <IconButton
                  onClick={() =>
                    Number.parseInt(value) < 0
                      ? setValue(name, 1)
                      : setValue(name, Number.parseInt(value) + 1)
                  }
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
              <FormHelperText>{errors[name]?.message}</FormHelperText>
            </Box>
          </FormControl>
        )}
      />
    </Box>
  );
}

export default NumberField;
