export function isFormValid(state){
    for( const key in state ){
        switch (key) {
            case 'avatar':
                if( state[key].url === undefined || state[key].url === null || state[key].url === '' ){
                    return false;
                }
                break;
        
            default:
                if( state[key] === undefined || state[key] === null || state[key] === '' ){
                    return false;
                }
                break;
        }
    }
    
    return true;
}

export function deleteRobot(id, setBots){
    let bots = JSON.parse( localStorage.getItem('bots') || '[]' );
    const updatedBots = bots.filter(bot => {
        return bot.hasOwnProperty('id') && bot.id !== id;
    });

    if( updatedBots.length >= 0 ){       
        localStorage.setItem('bots', JSON.stringify(updatedBots));
        setBots(updatedBots);
        return updatedBots;
    }

    return false;
}

export function getRobot(id){
    let bots = JSON.parse( localStorage.getItem('bots') || '[]' );
    const existBot = bots.filter(bot => {
        return bot.hasOwnProperty('id') && bot.id === id;
    });

    if( existBot.length >= 0 ){       
        return existBot[0];
    }

    return false;
}

export function addRobot(data){
    let bots = JSON.parse( localStorage.getItem('bots') || '[]' );
    const existBot = bots.filter(bot => {
        return bot.hasOwnProperty('id') && bot.id === data.id;
    });

    if( existBot.length <= 0 ){
        bots.push(data);
        
        localStorage.setItem('bots', JSON.stringify(bots));
        return bots;
    }

    return false;
}

export function updateRobot(id, data){
    let bots = JSON.parse( localStorage.getItem('bots') || '[]' );
    const updatedBots = bots.map(bot => {
        if( bot.hasOwnProperty('id') && bot.id === id ){
            return data;
        }else{
            return bot;
        }
    });

    if( updatedBots.length >= 0 ){    
        localStorage.setItem('bots', JSON.stringify(updatedBots));
        return updatedBots;
    }

    return false;
}