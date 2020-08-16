import React from 'react';

function ListOfUsers(props) {
    return(
            <li>
                {props.users}
            </li>
    )
}

export default ListOfUsers;