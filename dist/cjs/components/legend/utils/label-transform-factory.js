'use strict';

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

exports.labelTransformFactory = labelTransformFactory;
