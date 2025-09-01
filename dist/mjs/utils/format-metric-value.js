import { formatNumberCompact, formatNumber } from '@automattic/number-formatters';

/**
 * Format a numeric metric value based on type, precision and scale.
 * Supports currency, number and percentage, using @automattic/number-formatters.
 *
 * @param value                  - The value to format
 * @param type                   - The type of formatting to apply
 * @param options                - Formatting options
 * @param options.decimals       - Number of decimal places to show
 * @param options.useMultipliers - Whether to use K, M, B suffixes for large numbers
 * @param options.signDisplay    - Controls when to display the sign (auto, always, never, exceptZero)
 * @return Formatted string
 */
const formatMetricValue = (value, type = 'number', { decimals, useMultipliers = false, signDisplay } = {}) => {
    if (value === null || value === undefined) {
        return '';
    }
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
        return '';
    }
    switch (type) {
        case 'currency': {
            // Basic currency formatting - can be enhanced with full currency support
            const formatted = useMultipliers
                ? formatNumberCompact(numericValue, {
                    decimals: decimals ?? 2,
                    numberFormatOptions: {
                        maximumFractionDigits: decimals ?? 2,
                        signDisplay,
                    },
                })
                : formatNumber(numericValue, {
                    decimals: decimals ?? 2,
                    numberFormatOptions: {
                        signDisplay,
                    },
                });
            return `$${formatted}`;
        }
        case 'average': {
            if (!Number.isFinite(numericValue)) {
                return '—';
            }
            return formatNumber(numericValue, {
                decimals: decimals ?? 0,
                numberFormatOptions: {
                    style: 'percent',
                    signDisplay: signDisplay ?? 'exceptZero',
                },
            });
        }
        case 'number':
        default: {
            return useMultipliers
                ? formatNumberCompact(numericValue, {
                    decimals: decimals ?? 0,
                    numberFormatOptions: {
                        maximumFractionDigits: decimals ?? 0,
                        signDisplay,
                    },
                })
                : formatNumber(numericValue, {
                    decimals: decimals ?? 0,
                    numberFormatOptions: {
                        signDisplay,
                    },
                });
        }
    }
};

export { formatMetricValue };
