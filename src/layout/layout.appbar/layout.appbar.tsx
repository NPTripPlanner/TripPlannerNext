import { Container } from '@material-ui/core';
import React from 'react';

export interface IProps {
    children?: React.ReactNode;
    appbar?: React.ReactNode;
}
const LayoutAppbar = (props:IProps) => {
    const {
        children,
        appbar = undefined,
    } = props;

    return (
        <Container disableGutters={true}>
            {appbar}
            {children}
        </Container>
    );
};

export default LayoutAppbar;