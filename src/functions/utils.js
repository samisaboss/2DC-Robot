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

export function findBot(bots, id){
    return bots.find(bot => bot.hasOwnProperty('id') && bot.id === id);
}