import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { isFormValid } from '../functions/utils';
import { useAddBotMutation, useUpdateBotMutation, useGetBotQuery } from '../features/api/botApi';

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

export const RobotForm = props => {
    const { action, ...allProps } = props;
    const { botId } = useParams();

    const navigate = useNavigate();

    const [robot, setRobot] = useState({
        id: '', 
        name: '', 
        purpose: '', 
        avatar: {
            url: 'https://api.dicebear.com/5.x/bottts-neutral/svg',
            svg: ''
        }
    });

    const {
        data: bot,
        isSuccess, 
        isLoading
    } = useGetBotQuery(botId, {
        skip: (action !== 'edit'),
        refetchOnMountOrArgChange: true,
    });
    
    const [ addBot, { isLoading: isAdding } ] = useAddBotMutation();
    const [ updateBot, { isLoading: isUpdating } ] = useUpdateBotMutation();


    const handleNameChange = (event) => {
        setRobot({
            ...robot, 
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

    const resetAll = () => {
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
    }

    const handleSubmit = () => {
        if( isFormValid(robot) ){
            if( action === 'edit' ){
                updateBot(robot)
                    .then(() => {
                        resetAll();
                    })
                    .catch((error) => console.log(error));
            }else{
                addBot(robot)
                    .then(() => {
                        resetAll();
                    })
                    .catch((error) => console.log(error));
            }
        }else{
            alert('Form is not valid');
        }
    }

    useEffect(() => {
        if( isSuccess ){
            setRobot(bot);
        }
    }, [isSuccess, bot]);

    if( isLoading ){
        return <p>Loading...</p>;
    }

    return (
        <section {...allProps}>
            <Heading as='h1' size='xl' mb={4}>{ action === 'edit' ? 'Update Robot' : 'Build Robot' }</Heading>
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
            <Button colorScheme='teal' onClick={handleSubmit} isDisabled={isAdding || isUpdating} isLoading={isAdding || isUpdating}>{ action === 'edit' ? 'Edit Now' : 'Build Now' }</Button>
        </section>
    );
};