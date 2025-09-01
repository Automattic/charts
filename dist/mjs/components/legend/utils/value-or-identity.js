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

export { valueOrIdentity, valueOrIdentityString };
