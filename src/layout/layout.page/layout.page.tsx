import { Box } from '@material-ui/core';
import React from 'react';

export interface IProps {
    children?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode; 
}

const renderHeader = (header)=>{
    if(!header) return null;

    return (<Box>{header}</Box>);
}

const renderFooter = (footer)=>{
    if(!footer) return null;

    return (<Box>{footer}</Box>);
}

const LayoutPage = (props:IProps) => {
    const {
        children,
        header,
        footer,
    } = props;
    
    return (
        <Box>
            {renderHeader(header)}
            <Box>
                {children}
            </Box>
            {renderFooter(footer)}
        </Box>
    );
};

export default LayoutPage;