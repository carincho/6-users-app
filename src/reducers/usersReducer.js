

export const usersReducer = (state = [], action) => {
  
    switch (action.type) {

        case 'addUser':
            
            return [

                ...state,
                {
                    ...action.payload,//Este es el objeto usuario
                    id: new Date().getTime(),

                }
            ];

            case 'removeUser':
                
                return state.filter(user => user.id !== action.payload) //State son la lista de usuarios, aqui el payload es el id, filter regresa un nuevo arreglo

            case 'updateUser':
                return state.map( u => {
                    if(u.id === action.payload.id) {
                        return {
                            ...action.payload,
                            password : u.password,
                        }
                    }
                    return u;
                })// map devuelve una nueva instancia del arreglo con los cambios es inmutable
    
        default:
            return state;
    }
}
