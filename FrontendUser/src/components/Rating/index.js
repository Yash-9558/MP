import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
const BasicRating = forwardRef((props, ref) => {
  const [value, setValue] = useState(props?.value || props.defaultValue || 0);
  const [hover, setHover] = useState(-1);
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      value: value,
    };
  });
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={props.onClick || null}
    >
      <Rating
        ref={inputRef}
        name="hover-feedback"
        value={value}
        readOnly={props.readOnly || false}
        size="large"
        precision={0.5}
        sx={{
          fontSize:
            props.size == "small"
              ? "var(--medium-font-size)"
              : "var(--large-font-size)",
          color: "var(--color-black)",
        }}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
      />
      {!props.readOnly && value !== null && (
        <Box sx={{ ml: 2, fontSize: "var(--medium-font-size)" }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
});
export default BasicRating;
