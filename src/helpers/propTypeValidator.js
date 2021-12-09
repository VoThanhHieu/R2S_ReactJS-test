const numberBetween = (min, max) => {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (typeof prop !== "number" || prop < min || prop > max) {
      return new Error(
        `Prop ${propName} is not a number between ${min} and ${max} on ${componentName}`
      );
    }
  };
};
const Validators = {
  numberBetween,
};
export default Validators;
