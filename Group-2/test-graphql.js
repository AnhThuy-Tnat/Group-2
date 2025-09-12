// Script để test GraphQL endpoint
const fetch = require('node-fetch');

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// Query để lấy danh sách patients
const GET_PATIENTS_QUERY = `
  query GetPatients($page: Int, $limit: Int, $filter: String) {
    patients(page: $page, limit: $limit, filter: $filter) {
      data {
        id
        name
        email
        phone
        gender
        dob
        physician {
          id
          name
          email
        }
        addressInfo {
          address
          city
          state
          country
        }
      }
      total
      totalPages
    }
  }
`;

// Query để lấy thông tin schema
const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        kind
        description
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  }
`;

async function testGraphQL() {
  try {
    console.log('🔍 Testing GraphQL endpoint...\n');
    
    // Test introspection
    console.log('1. Testing introspection query...');
    const introspectionResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: INTROSPECTION_QUERY
      })
    });
    
    const introspectionData = await introspectionResponse.json();
    console.log('✅ Introspection successful');
    console.log('Available types:', introspectionData.data?.__schema?.types?.map(t => t.name).filter(name => name && !name.startsWith('__')).join(', '));
    
    // Test patients query
    console.log('\n2. Testing patients query...');
    const patientsResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_PATIENTS_QUERY,
        variables: {
          page: 1,
          limit: 10,
          filter: ""
        }
      })
    });
    
    const patientsData = await patientsResponse.json();
    
    if (patientsData.errors) {
      console.log('❌ Errors:', patientsData.errors);
    } else {
      console.log('✅ Patients query successful');
      console.log('Total patients:', patientsData.data.patients.total);
      console.log('Patients data:', JSON.stringify(patientsData.data.patients.data, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error testing GraphQL:', error.message);
  }
}

testGraphQL();
