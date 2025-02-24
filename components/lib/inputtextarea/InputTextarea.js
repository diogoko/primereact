import * as React from 'react';
import { KeyFilter } from '../keyfilter/KeyFilter';
import { Tooltip } from '../tooltip/Tooltip';
import { classNames, DomHandler, mergeProps, ObjectUtils } from '../utils/Utils';
import { InputTextareaBase } from './InputTextareaBase';

export const InputTextarea = React.memo(
    React.forwardRef((inProps, ref) => {
        const props = InputTextareaBase.getProps(inProps);

        const elementRef = React.useRef(ref);
        const cachedScrollHeight = React.useRef(0);

        const { ptm } = InputTextareaBase.setMetaData({
            props
        });

        const onFocus = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onFocus && props.onFocus(event);
        };

        const onBlur = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onBlur && props.onBlur(event);
        };

        const onKeyUp = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onKeyUp && props.onKeyUp(event);
        };

        const onKeyDown = (event) => {
            props.onKeyDown && props.onKeyDown(event);

            if (props.keyfilter) {
                KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
            }
        };

        const onPaste = (event) => {
            props.onPaste && props.onPaste(event);

            if (props.keyfilter) {
                KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
            }
        };

        const onInput = (event) => {
            const target = event.target;

            if (props.autoResize) {
                resize(ObjectUtils.isEmpty(target.value));
            }

            props.onInput && props.onInput(event);

            ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
        };

        const resize = (initial) => {
            const inputEl = elementRef.current;

            if (inputEl && DomHandler.isVisible(inputEl)) {
                if (!cachedScrollHeight.current) {
                    cachedScrollHeight.current = inputEl.scrollHeight;
                    inputEl.style.overflow = 'hidden';
                }

                if (cachedScrollHeight.current !== inputEl.scrollHeight || initial) {
                    inputEl.style.height = '';
                    inputEl.style.height = inputEl.scrollHeight + 'px';

                    if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
                        inputEl.style.overflowY = 'scroll';
                        inputEl.style.height = inputEl.style.maxHeight;
                    } else {
                        inputEl.style.overflow = 'hidden';
                    }

                    cachedScrollHeight.current = inputEl.scrollHeight;
                }
            }
        };

        React.useEffect(() => {
            ObjectUtils.combinedRefs(elementRef, ref);
        }, [elementRef, ref]);

        React.useEffect(() => {
            if (props.autoResize) {
                resize(true);
            }
        }, [props.autoResize]);

        const isFilled = React.useMemo(() => ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue), [props.value, props.defaultValue]);
        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
        const className = classNames(
            'p-inputtextarea p-inputtext p-component',
            {
                'p-disabled': props.disabled,
                'p-filled': isFilled,
                'p-inputtextarea-resizable': props.autoResize
            },
            props.className
        );

        const rootProps = mergeProps(
            {
                ref: elementRef,
                className: className,
                onFocus: onFocus,
                onBlur: onBlur,
                onKeyUp: onKeyUp,
                onKeyDown: onKeyDown,
                onInput: onInput,
                onPaste: onPaste
            },
            InputTextareaBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <>
                <textarea {...rootProps}></textarea>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} {...props.tooltipOptions} pt={ptm('tooltip')} />}
            </>
        );
    })
);

InputTextarea.displayName = 'InputTextarea';
