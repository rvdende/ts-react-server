import React from 'react';
import { WidgetComponent, WidgetState } from './widgetcomponent'
import styled from 'styled-components';
import { Spring, animated, interpolate } from "react-spring/renderprops";

const WidgetBasicWrap = styled.div`
    text-align: center;
    height: 100%;
    color: ${({ theme }) => theme.text};
`;

export default class WidgetSpring extends WidgetComponent {
    state: WidgetState = {
        options: {},
        count: 0
    }


    render() {
        return (
            <WidgetBasicWrap>
                SPRING TEST

                <Spring
                    native
                    from={{ o: 0, xyz: [0, 0, 0], color: "red" }}
                    to={{ o: 1, xyz: [10, 20, 5], color: "green" }}
                >
                    {({ o, xyz, color }) => (
                        <animated.div
                            style={{
                                // If you can, use plain animated values like always, ...
                                // You would do that in all cases where values "just fit"
                                color,
                                // Unless you need to interpolate them
                                background: o.interpolate(o => `rgba(210, 57, 77, ${o})`),
                                // Which works with arrays as well
                                transform: xyz.interpolate(
                                    (x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`
                                ),
                                // If you want to combine multiple values use the "interpolate" helper
                                border: interpolate(
                                    [o, color],
                                    (o, c) => `${o * 10}px solid ${c}`
                                ),
                                // You can also form ranges, even chain multiple interpolations
                                padding: o
                                    .interpolate({ range: [0, 0.5, 1], output: [0, 0, 10] })
                                    .interpolate(o => `${o}%`),
                                // There's also a shortcut for plain, optionless ranges ...
                                opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1])
                            }}
                        >
                            {// Finally, this is how you interpolate innerText
                                o.interpolate(n => n.toFixed(2))}
                        </animated.div>
                    )}
                </Spring>

            </WidgetBasicWrap>
        );
    }
};

