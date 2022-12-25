import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EventBus from "../../../common/EventBus";

import AuthService from "../../../services/auth.service";
import GetDataService from '../../../services/get-data.service';

import { useHistory } from "react-router-dom"

const columnsRoles = [
    { field: 'id', headerName: 'ID', width: 60, },
    {
        field: 'name', headerName: 'Role_name', width: 200,
    },
]

const columnsUnits = [
    { field: 'id', headerName: 'ID', width: 60, },
    { field: 'unit_output', headerName: 'Название подразделения', width: 200, },
    {
        field: 'name', headerName: 'Название подразделения в базе', width: 200,
    },
    
]

export default function UsersTable() {

    const [roles, setRoles] = useState([]);
    const [units, setUnits] = useState([]);
 
    const getRolesData = async () => {
        try {
            const data = await GetDataService.getAllRoles();
            setRoles(data.data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const getUnitsData = async () => {
        try {
            const data = await GetDataService.getAllUnits();
            setUnits(data.data)
        }
        catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getRolesData()
        getUnitsData()
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
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'id', sort: 'asc' }]
                },
              }}
              rows={roles}
              columns={columnsRoles}
              //pageSize={pageSize}
              
            //onCellClick={handleCellClick}
  
            // checkboxSelection
  
            />)
        </div>
        <br></br>
        <br></br>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'id', sort: 'asc' }]
                },
              }}
              rows={units}
              columns={columnsUnits}
              //pageSize={pageSize}
              
            //onCellClick={handleCellClick}
  
            // checkboxSelection
  
            />)
        </div>
      </div>
    );
}