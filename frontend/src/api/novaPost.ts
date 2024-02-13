export const NP_URL = ' https://api.novaposhta.ua/v2.0/json/';

export function getCities(query: string) {
  return fetch(NP_URL, {
    method: 'POST',
    body: JSON.stringify({
      apiKey: process.env.REACT_APP_NP_KEY,
      modelName: 'Address',
      calledMethod: 'getSettlements',
      methodProperties: {
        AreaRef: '',
        Ref: '',
        RegionRef: '',
        Page: '1',
        Warehouse: '1',
        FindByString: query,
        Limit: ''
      }
    })
  });
}

export function getWarehouses(cityRef: string) {
  return fetch(NP_URL, {
    method: 'POST',
    body: JSON.stringify({
      apiKey: process.env.REACT_APP_NP_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        FindByString: '',
        CityName: '',
        CityRef: '',
        Page: '1',
        Limit: '150',
        Language: 'UA',
        TypeOfWarehouseRef: '',
        WarehouseId: '',
        SettlementRef: cityRef
      }
    })
  });
}
