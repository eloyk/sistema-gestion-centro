import axios from 'axios';
import qs from 'qs'
import config from '../config/config';

// function validarCorreoElectronico(correo: string): boolean {
//   const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   return expresionRegular.test(correo);
// }

export const getToken = async (username: string, password: string, clientId: string) => {
  try {
    if (!username) {
      throw new Error('El nombre de usuario es nulo o indefinido.');
    }

    // const [user, clientId] = username.split('@')
    let body;
    let realm;
    if (clientId === "admin-cli") {
      realm = 'master'
      body = qs.stringify({
        grant_type: config.KEYCLOAK.KEYCLOAK_GRANT_TYPE,
        client_id: clientId,
        username: username,
        password: password
      });
    } else {
      realm = 'schoolsys'
      body = qs.stringify({
        grant_type: config.KEYCLOAK.KEYCLOAK_GRANT_TYPE,
        client_id: clientId,
        username: username,
        password: password
      });
    }
    const axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.KEYCLOAK.KEYCLOAK_URL}/realms/${realm}/protocol/openid-connect/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: body
    };

    const response = await axios(axiosConfig);
    if (response.status === 200) {
      console.log('Token generado correctamente en Keycloak.');
    } else {
      console.error('Error al generar el token en Keycloak:', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error al comunicarse con Keycloak:', error);
  }
};

export const createClient = async (clientId: string, accessToken: string) => {
  try {
    const body = ({
      clientId,
      // enabled: true
    });

    const axiosConfig = {
        method: 'post',
        url: `${config.KEYCLOAK.KEYCLOAK_URL}/realms/schoolsys/clients-registrations/default`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        data: body
    };
    
    const response = await axios(axiosConfig);
    if (response.status === 201) {
      console.log('Cliente creado correctamente en Keycloak.');
    } else {
      console.error('Error al crear el cliente en Keycloak:', response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Error al comunicarse con Keycloak:', error);
  }
}

export const creterole = async (clientId: string, roleName: string, accessToken: string) => {
  try {
    const body = ([{
      "name": roleName,
      "composite": false,
      "clientRole": true,
    }]);

    const axiosConfig = {
      method: 'post',
      url: `${config.KEYCLOAK.KEYCLOAK_URL}/admin/realms/schoolsys/clients/${clientId}/roles`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: body
    };

    const response = await axios(axiosConfig);
    if (response.status === 201) {
      console.log(`Rol '${roleName}' creado correctamente para el cliente '${clientId}'.`);
    } else {
      console.error('Error al crear el rol en Keycloak:', response.data);
    }
  } catch (error) {
    console.error('Error al comunicarse con Keycloak:', error);
  }
}

export const createUser = async (adminToken: string, username: string, password: string, email: string ) => {
  try {
    const body = ({
      "username": username, 
      "enabled": true, 
      "realmRoles": [ 
        "user", 
        "offline_access" 
      ], 
      "credentials": [
        {
            "type": 'password',
            "value": password,
            "temporary": false,
        }
      ],
    });


    const axiosConfig = {
      method: 'post',
      url: `${config.KEYCLOAK.KEYCLOAK_URL}/admin/realms/schoolsys/users`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      data: body
    };

    const response = await axios(axiosConfig);
    if (response.status === 201) {
      const userId = response.data.id;
      console.log('Usuario creado con éxito. ID:', userId);
      return userId;
    } else {
      console.error('Error al crear el usuario:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error al comunicarse con Keycloak:', error);
    return null;
  }
}

export const assignRoleToUser = async (clientId: string, userId: string, roleName: string, accessToken: string) => {
  try {
    const body = qs.stringify({
      id: roleName,
      name: roleName,
      scopeParamRequired: false,
      composite: false
    });

    const axiosConfig = {
      method: 'post',
      url: `${config.KEYCLOAK.KEYCLOAK_URL}/admin/realms/schoolsys/users/${userId}/role-mappings/clients/${clientId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: [body]
    };

    const response = await axios(axiosConfig);
    if (response.status === 204) {
      console.log(`Rol '${roleName}' asignado correctamente al usuario.`);
    } else {
      console.error('Error al asignar el rol al usuario en Keycloak:', response.data);
    }
  } catch (error) {
    console.error('Error al comunicarse con Keycloak:', error);
  }
}