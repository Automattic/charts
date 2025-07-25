/**
 * Returns an object's value if defined, or the object.
 * @param _ - The object to return the value of.
 * @return The value of the object, or the object itself.
 */
function valueOrIdentity(_) {
    if (_ && typeof _ === 'object' && 'value' in _ && typeof _.value !== 'undefined')
        return _.value;
    return _;
}
/**
 * Returns an object's value if defined, or the object, coerced to a string.
 * @param _ - The object to return the value of.
 * @return The value of the object, or the object itself.
 */
function valueOrIdentityString(_) {
    return String(valueOrIdentity(_));
}
/**
 * Returns a function which takes a Datum and index as input, and returns a formatted label object.
 * @param {object}                            root0             - The object to return the value of.
 * @param {AnyD3Scale}                        root0.scale       - The scale to use.
 * @param {LabelFormatter<ScaleInput<Scale>>} root0.labelFormat - The label format to use.
 * @return {ItemTransformer<ScaleInput<Scale>, ReturnType<Scale>>} The label transform factory.
 */
function labelTransformFactory({ scale, labelFormat, }) {
    return (d, i) => ({
        datum: d,
        index: i,
        text: `${labelFormat(d, i)}`,
        value: scale(d),
    });
}

export { labelTransformFactory, valueOrIdentity, valueOrIdentityString };
