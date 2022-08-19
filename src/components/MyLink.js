import React from 'react';
import { GridItem } from '@chakra-ui/react'
export const MyLink = props => {

    const styles = {
        width: 200,
        height: 'auto'
    }

    return <>

        <GridItem>
            <a href={props.link.url} target="_blank">
                <img style={styles} src={props.link.icon} title={props.link.name}/><br />
            </a>
        </GridItem>
    </>
};
