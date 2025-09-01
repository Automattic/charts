'use strict';

var react = require('react');

/**
 * Custom hook to manage funnel bar selection state and interactions
 * @return Object containing selection state and event handlers
 */
const useFunnelSelection = () => {
    const [clickedStep, setClickedStep] = react.useState(null);
    // Handle bar click
    const handleBarClick = react.useCallback((stepId) => {
        if (clickedStep === stepId) {
            // If clicking the same step, deselect it
            setClickedStep(null);
        }
        else {
            // Otherwise, select this step
            setClickedStep(stepId);
        }
    }, [clickedStep]);
    // Handle bar keydown
    const handleBarKeyDown = react.useCallback((stepId, event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (clickedStep === stepId) {
                setClickedStep(null);
            }
            else {
                setClickedStep(stepId);
            }
        }
        else if (event.key === 'Escape') {
            event.preventDefault();
            setClickedStep(null);
        }
    }, [clickedStep]);
    // Clear selection (for chart-level click)
    const clearSelection = react.useCallback(() => {
        setClickedStep(null);
    }, []);
    // Get step state helpers
    const getStepState = react.useCallback((stepId) => ({
        isClicked: clickedStep === stepId,
        isBlurred: clickedStep !== null && clickedStep !== stepId,
    }), [clickedStep]);
    return {
        clickedStep,
        handleBarClick,
        handleBarKeyDown,
        clearSelection,
        getStepState,
    };
};

exports.useFunnelSelection = useFunnelSelection;
