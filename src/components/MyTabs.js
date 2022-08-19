import { React, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Input, Button, Select, Grid, GridItem, Textarea  } from '@chakra-ui/react'
import utils from '../utils/localStorage';
import { MyLink } from './MyLink';

export const MyTabs = props => {

    const data = utils.getAllBookmarks();
    const emptyLink = {
        name: '',
        url: '',
        icon: '',
        notes: '',
        folderName: ''
    };

    const [link, setLink] = useState(emptyLink);

    const [folder, setFolder] = useState({
        name: '',
        children: []
    });

    const [background, setBackground ] = useState('');

    const handleLinkChange = event => {
        console.log(`link.${event.target.name}: `, event);
        setLink({ ...link, [event.target.name]: event.target.value })
    };

    const handleFolderChange = event => {
        console.log('event.target', event.target);
        setFolder({ ...folder, name: event.target.value })
    };

    const handleSaveLink = () => {
        utils.saveBookmark({
            name: link.name,
            url: link.url,
            icon: link.icon,
            notes: link.notes
        }, link.folderName);
        setLink(emptyLink);
    }

    const handleSaveFolder = () => {
        utils.saveFolder(folder.name);
        setFolder({
            name: '',
            children: []
        });
    }

    const styles = {
        label: {
            color: "white"
        },
        labelDark: {
            color: "#333"
        }
    }

    return <Tabs backgroundColor={'rgba(0, 0, 0, 0.3)'} colorScheme={'blackAlpha'}>
        <TabList>
            {data.map(folder => <Tab color={'white'} _selected={{ color: 'white', bg: 'rgba(0, 0, 0, 0.5)' }} key={folder.folderName}>{folder.folderName}</Tab>)}
            <Tab color={'white'} _selected={{ color: 'white', bg: 'rgba(0, 0, 0, 0.5)' }}>Settings</Tab>
        </TabList>

        <TabPanels>
            {data.map(folder => {
                return <TabPanel key={folder.folderName}>
                    <Grid
                        h='200px'
                        templateRows='1fr'
                        templateColumns='repeat(8, 1fr)'
                        gap={1}
                    >
                        {folder.children.map(link => <MyLink link={link} key={link.name} />)}
                    </Grid>
                </TabPanel>
            })}
            <TabPanel>
                <Tabs colorScheme={'blackAlpha'}>
                    <TabList>
                        <Tab color={'white'} _selected={{ color: 'white', bg: 'rgba(0, 0, 0, 0.5)' }}>Add Folder</Tab>
                        <Tab color={'white'} _selected={{ color: 'white', bg: 'rgba(0, 0, 0, 0.5)' }}>Add Link</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <h3 style={styles.label}>Add Folder</h3>
                            <label htmlFor="name" style={styles.label}>
                                Folder Name
                                <Input name='name' placeholder='name' value={folder.name} onChange={handleFolderChange} />
                            </label>
                            <Button colorScheme='blue' onClick={handleSaveFolder}>Add Folder</Button>
                        </TabPanel>
                        <TabPanel>
                            <h3 style={styles.label}>Add Link</h3>
                            <label htmlFor='name' style={styles.label}>
                                Name:
                                <Input name='name' placeholder='name' value={link.name} onChange={handleLinkChange} />
                            </label>
                            <label htmlFor="url" style={styles.label}>
                                URL:
                                <Input name='url' placeholder='url' value={link.url} onChange={handleLinkChange} />
                            </label>
                            <label htmlFor="icon" style={styles.label}>
                                Icon:
                                <Input name='icon' placeholder='icon link' value={link.icon} onChange={handleLinkChange} />
                            </label>
                            <label htmlFor="Notes" style={styles.label}>
                                Notes:
                                <Textarea name='notes' placeholder='notes' value={link.notes} onChange={handleLinkChange} />
                            </label>
                            <label htmlFor="folderName" style={styles.label}>
                                Folder
                                <Select name='folderName' placeholder='Select option' onChange={handleLinkChange} value={link.folderName}>
                                    {data.map(folder => <option style={styles.labelDark} onChange={handleLinkChange} value={folder.folderName} key={folder.folderName}>{folder.folderName}</option>)}
                                </Select>
                            </label>
                            <Button colorScheme='blue' onClick={handleSaveLink}>Add Link</Button>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </TabPanel>
        </TabPanels>
    </Tabs>
};
