import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EventBus from "../../../common/EventBus";

import AuthService from "../../../services/auth.service";
import GetDataService from '../../../services/get-data.service';

import { useHistory } from "react-router-dom"

const columns = [
    { field: 'id', headerName: 'ID', width: 60, },
    {
        field: 'fullname', headerName: 'ФИО', width: 200,
    },
    { field: 'username', headerName: 'Username', width: 200, },
    { field: 'email', headerName: 'E-mail', width: 250, },
    {
        field: 'roles', headerName: 'Роль', width: 200,
        valueGetter: ({value}) => value.name,
    },
]

export default function UsersTable() {

    const [users, setUsers] = useState([]);

    const getUsersData = async () => {
        try {
            const data = await GetDataService.getAllUsers();
            setUsers(data.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsersData()
    }, [])

    // const [showUsersTable, setShowUsersTable] = useState(false);

    // useEffect(() => {
    //     const user = AuthService.getCurrentUser();

    //     if (user) {
    //         showUsersTable(user.roles.includes("ROLE_USER"))
    //     }

    //     EventBus.on("logout", () => {
    //         logOut();
    //     });

    //     return () => {
    //         EventBus.remove("logout");
    //     };
    // }, []);

    // const logOut = () => {
    //     AuthService.logout();
    //     setShowUsersTable(false);
    // };

    let history = useHistory(); //use this

    return (
        <div>
        <div><button type="button" class="btn btn-back" onClick={() => history.goBack()}>Назад</button></div>
        <div className="head-table">
          <h2 align="center">Таблица мероприятий</h2>
          <hr align="center" width="100%" size="2" color="red" />
        </div>
        <div style={{ height: 800, width: '100%' }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'fullname', sort: 'asc' }]
                },
              }}
              rows={users}
              columns={columns}
              //pageSize={pageSize}
              pagination={true}
              rowsPerPageOptions={[20, 50, 100]}
              components={{ Toolbar: GridToolbar }}
              
            //onCellClick={handleCellClick}
  
            // checkboxSelection
  
            />)
        </div>
      </div>
    );
}