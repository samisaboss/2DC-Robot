import React, { useState, useEffect } from 'react';
import {
    Heading, 
    Stack, 
    HStack,
    Box,
    Input, 
    Textarea,
    FormControl, 
    FormLabel, 
    Button, 
    Avatar
} from '@chakra-ui/react';
import md5 from 'md5';
import { useNavigate, useParams } from "react-router-dom";
import { getRobot, addRobot, updateRobot, isFormValid } from '../functions/utils';

export const RobotForm = props => {
    const { action, ...allProps } = props;
    const navigate = useNavigate();
    const { botId } = useParams();

    const [robot, setRobot] = useState({
        id: '', 
        name: '', 
        purpose: '', 
        avatar: {
            url: 'https://api.dicebear.com/5.x/bottts-neutral/svg',
            svg: ''
        }
    });
    const [buttonText, setButtonText] = useState('Build Now');
    const [pageHeading, setPageHeading] = useState('Build Robot');

    useEffect(() => {
        if( action === 'edit' ){
            const bot = getRobot(botId);
            if( bot ){
                setRobot(bot);
            }
            setButtonText('Update');
            setPageHeading('Edit Robot');
        }
    }, [action, botId]);

    const handleNameChange = (event) => {
        setRobot({
            ...robot, 
            id: md5(event.target.value), 
            name: event.target.value
        });
    }

    const handlePurposeChange = (event) => {
        setRobot({
            ...robot, 
            purpose: event.target.value
        });
    }

    const getRandomAvatar = () => {
        const url = `${robot.avatar.url}?seed=${ Math.random() * 10}`;

        fetch(url)
        .then(response => response.text())
        .then((svg) => {
            setRobot({
                ...robot, 
                avatar: {
                    url: url, 
                    svg: svg
                }
            });
        });
    }

    const handleSubmit = () => {
        if( isFormValid(robot) ){
            if( action === 'edit' ? updateRobot(botId, robot) : addRobot(robot) ){
                setRobot({
                    id: '', 
                    name: '', 
                    purpose: '', 
                    avatar: {
                        url: 'https://api.dicebear.com/5.x/bottts-neutral/svg',
                        svg: ''
                    }
                });
    
                navigate('/');
            }else{
                alert('Robot already exist');
            }
        }else{
            alert('Form is not valid');
        }
    }

    return (
        <section {...allProps}>
            <Heading as='h1' size='xl' mb={4}>{pageHeading}</Heading>
            <HStack spacing='32px' align='top' mb={4}>
                <Box w='75%'>
                    <Stack spacing={3}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input value={robot.name} onChange={handleNameChange}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Job Description</FormLabel>
                            <Textarea
                                value={robot.purpose}
                                onChange={handlePurposeChange}
                                placeholder='The purpose of this robot'
                                size='sm'
                            />
                        </FormControl>
                    </Stack>
                </Box>
                <Box w='25%'>
                    <Stack spacing={3} mb={4} align='center'>
                        <Avatar size='2xl' name={robot.name} src={robot.avatar.url} />
                        <Button onClick={getRandomAvatar} variant='outline'>Generate Avatar</Button>
                    </Stack>
                </Box>
            </HStack>
            <Button colorScheme='teal' onClick={handleSubmit}>{buttonText}</Button>
        </section>
    );
};