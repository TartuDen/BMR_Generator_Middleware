// apiMocks.js
// Define the delay function

/**
 * Delays execution for a specified duration.
 * @param {number} duration - The duration to delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
function delay(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

/**
 * Mock function to simulate fetching an authorization token.
 * This function returns a hardcoded token.
 * 
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @returns {Promise<string>} A Promise that resolves with the mock authorization token.
 */
async function GetAuthTokenMOCK(username, password) {
    const tokenExpirationTime = 3600 * 1000; // Token expiration time in milliseconds (e.g., 1 hour)
    // Check if token exists in the session and is not expired
    const storedToken = sessionStorage.getItem('authToken');
    const storedTokenTimestamp = sessionStorage.getItem('authTokenTimestamp');
    const currentTime = new Date().getTime();

    if (storedToken && storedTokenTimestamp && (currentTime - storedTokenTimestamp < tokenExpirationTime)) {
        // Token exists and is not expired, return it
        return Promise.resolve(storedToken);
    } else {
        // Generate a new token (mocked)
        const mockToken = 'mockAuthToken123';
        
        // Store the new token and timestamp in the session
        sessionStorage.setItem('authToken', mockToken);
        sessionStorage.setItem('authTokenTimestamp', currentTime.toString());
        
        return Promise.resolve(mockToken);
    }
}

/**
 * Simulates retrieving a list of parameters for operations with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of parameters for operations.
 */
async function GetParametersForOperationsMOCK() {
  await delay(500); // Simulating a delay of 500ms
  // Simulated list of parameters for operations
  const parameters = ["time", "temp", "rpm", "flow", "ppumpSet","torr"];
  return parameters;
}

/**
 * Simulates retrieving a list of equipment types with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment types.
 */
async function GetListEquipmentTypesMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  const equipmentTypes = [
    { name: "reactor" },
    { name: "oven" },
    { name: "balances" },
    { name: "d_filter" },
    { name: "n_filter" },
    { name: "m_pump" },
    { name: "p_pump" },
  ];

  return equipmentTypes;
}

/**
 * Simulates retrieving a list of activities for Reactor equipment - equipmentType with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of activities.
 */
async function GetListActivityMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment types
  var activities = [
    {
      Equipment: "reactor",
      OperationType: "preparation_of_reactor",
      Content:
      `The reactor {reactor} and thermostat are checked to be ready for work. A stirrer drive is installed.
On lid (clockwise):
1. Reflux condenser on ball ground joint
2. 60 mm flange port (with lid)
3. Valve (for loading liquid).
4. Overpressure release valve
5. Liquid dosage system
6. Thermometer
7. Valve with PTFE tubing for sparging of argon, closed, connected to argon cylinder with reducing valve;
The cold trap is connected behind the reactor.`,
      Other:
      ``
    },
    {
      Equipment: "reactor",
      OperationType: "loading_of_solid",
      Content:
      `Required amount of {material} is weighed on the balances {balances} into jug "{jug}" using a plastic scoop. 
Weighted material is loaded into reactor {reactor} in portions via a 60 mm flange port using funnel "{funnel}". 
The 60 mm flange port is closed.

Specified amount: ….. kg (….. - ….. kg)`,
      Other:
`Warehouse code:
...........
Actual loading:
....... kg`
    },
    {
      Equipment: "reactor",
      OperationType: "loading_of_liquid",
      Content:
      `Required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the reactor via a liquid loading valve. 
The peristaltic pump is set to {ppumpSet}%. 
After loading is done, the pump is stopped, and the hose is removed. The 60 mm flange port is closed. The hose is cleaned.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg
Actual pump
setting: ..... %`  
    },
    {
      Equipment: "reactor",
      OperationType: "dosing_of_liquid",
      Content:
        `The required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the dosing system. 
The peristaltic pump is set to {ppumpSet}%. After loading is done, the pump is stopped, hose is removed. 
The dosing system is closed. The hose is cleaned.

Specified amount: ….. kg (….. - ….. kg)`,
Other:
`Warehouse code:
...........
Actual loading:
....... kg
Actual pump
setting: ..... %`
    },
    {
      Equipment: "reactor",
      OperationType: "creating_argon_flow",
      Content:
      `Argon line is connected to the argon port of reactor {reactor}. 
The Argon flow is set to {flow}l/min. The valve is opened. 
After the required time is passed, the argon flow is closed.`,
    Other:
`Actual flow
setting: .... l/min`  
    },    
    {
      Equipment: "reactor",
      OperationType: "hold_time",
      Content:
        `Reaction mixture is stirred during {time}. 
Temperature set is {temp}°C. Stirring is set to {rpm} rpm.`,
Other:
`Actual temp
setting: ..... °C
Actual stirring
setting: .... rpm`
    },
    {
      Equipment: "reactor",
      OperationType: "stirring_on",
      Content: "Stirring in reactor {reactor} is turned ON. Set to {rpm} rpm.",
      Other:
`Actual stirring
setting: .... rpm`
    },
    {
      Equipment: "reactor",
      OperationType: "stirring_off",
      Content: "Stirring in reactor {reactor} is turned OFF.",
      Other:
      ``
    },
    {
      Equipment: "reactor",
      OperationType: "heating_on",
      Content:
      `Heating for reactor {reactor} is turned ON. Temperature is set to {temp}°C. 
The target temperature is {temp}°C. Once the temperature is in a given range, the setting is changed to {temp}°C.`,
Other:
`Actual temp
setting: ..... °C`
    },
    {
      Equipment: "d_filter",
      OperationType: "preparation of filter",
      Content:
      `The filter {d_filter} is assembled and prepared to work. 
The filtration cloth is prepared and properly installed. 
Argon and product lines are connected to the lid, pressure test is done.`,
    Other:
    ``
    },
    {
      Equipment: "d_filter",
      OperationType: "loading on filter",
      Content:
      `Product is loaded on the filter {d_filter} via product line. The Argon line is closed during loading. 
Once 2/3 of the filter is loaded, stop pumping and close the product line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `filtration with argon pressure`,
      Content:
      `Check that the product line is closed, and check the pressure on Argon cylinder {Argon cylinder}, it must be in the range 0.5-1bar. 
Open the argon line on the lid of the filter {d_filter} and wait until no more or very little of ML is coming into the receiver (visually on the level tube). 
At the end of operation close the argon line.`,
    Other:
    ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `discharging ML`,
      Content:
      `Check that the product line and argon line are closed. 
Release the top valve on the receiver to make sure there is no extra pressure. 
Connect peristaltic pump {p_pump} to the bottom valve of the filter {d_filter} using norprene hose "{hose}". 
The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {p_pump} %. 
Start the pump. Continue the process until all ML is unloaded into the respective receiver.`,
     Other:
      ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `washing FK`,
      Content:
      `The lid of filter {d_filter} is opened. 
The required amount of material is weighed on the balances {balances} using a jug "{jug}". 
The solvent is loaded on top of the filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed. The lid is closed.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`,
     Other:
      ``
    },
    {
      Equipment: `d_filter`,
      OperationType: `drying on filter`,
      Content:
      `The filter cake is additionally dried on the filter {d_filter} using argon flow - Argon cylinder. 
Argon is set to {flow} l/min, check that the outlet valve is opened and the stream is led to the ventilation. Argon line is opened. 
Drying on the filter is continued for min. After the required time is passed, the argon line is closed.`,
Other:
`Actual flow
setting: .... l/min` 
    },
    {
      Equipment: `d_filter`,
      OperationType: `unloading from filter`,
      Content:
        `The lid of the filter {d_filter} is opened. Material from the filter is unloaded using shovel "{shovel}" <to where>.

Specified amount: ….. kg (….. - ….. kg)`,
        Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `d_filter`,
      OperationType: `unloading from filter`,
      Content:
        `The lid of the filter {d_filter} is opened. Material from the filter is unloaded using shovel "{shovel}" <to where>.

Specified amount: ….. kg (….. - ….. kg)`,
        Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `n_filter`,
      OperationType: `preparation of filter`,
      Content:
      `The filter {n_filter} is assembled and prepared to work. 
The filtration cloth is prepared and properly installed. 
Membrane pump {m_pump} is connected.`,
    Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `vacuum setting`,
      Content: `Membrane pump {m_pump} is set {torr} Torr.`,
      Other:
`Actual pump
setting: ..... Torr`
    },
    {
      Equipment: `n_filter`,
      OperationType: `loading on filter`,
      Content:
      `Membrane pump {m_pump} is started. 
The product is loaded on the filter {n_filter} using jug "{jug}". 
Once 2/3 of the filter is loaded, stop loading.`,
Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `discharging ML`,
      Content:
      `Stop the pump. Connect peristaltic pump {p_pump} to the bottom valve of the filter using norprene hose "{hose}". 
The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {p_pump} %. 
Start the pump. 
Continue the process until all ML is unloaded into the respective receiver.`,
    Other:
      ``
    },
    {
      Equipment: `n_filter`,
      OperationType: `washing FK`,
      Content:
      `Make sure the pump is stopped. The required amount of material is weighed on the balances {balances} using a jug "{jug}". 
Solvent {material} is loaded on top of filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `n_filter`,
      OperationType: `drying on filter`,
      Content:
      `The filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it. 
Membrane pump {m_pump} is set to {torr} Torr. Drying on the filter is continued for {time} min. 
After the required time is passed, the pump is stopped.`,
Other:
`Actual plump
setting: ..... Torr`
    },
    {
      Equipment: `n_filter`,
      OperationType: `unloading from filter`,
      Content:
        `The lid of the filter {n_filter} is opened. 
Material from the filter is unloaded using shovel "{shovel}" <to where>.

Specified amount: ….. kg (….. - ….. kg)`,
    Other:
`Warehouse code:
...........
Actual loading:
....... kg`  
    },
    {
      Equipment: `m_pump`,
      OperationType: `vacuum setting`,
      Content: `Membrane pump {m_pump} is set to {torr} Torrs.`,
      Other:
`Actual pump
setting: ..... Torr`
    },
    {
      Equipment: `p_pump`,
      OperationType: `speed setting`,
      Content: `Peristaltic pump {p_pump} is set to {ppumpSet} %.`,
          Other:
      ``
    },
  ];
    

  // Filter activities based on the equipment type
  if (equipmentType) {
    activities = activities.filter(activity => activity.Equipment === equipmentType);
  }
  return activities;
}


/**
 * Simulates retrieving a list of equipment for a special equipment type with a delay.
 *
 * @param {string} equipmentType - The type of equipment to retrieve from the DataBase
 * @returns {Promise<Array>} A promise that resolves with the simulated list of equipment for the specified type.
 */
async function GetEquipmentListByTypeMOCK(equipmentType) {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of equipment for different types
  const equipmentMap = {
    balances: [
      { name: "balances", code: "007-1" },
      { name: "balances", code: "007-10" },
      { name: "balances", code: "007-12" },
      { name: "balances", code: "007-16" },
      { name: "balances", code: "007-21" },
      { name: "balances", code: "007-25" },
      { name: "balances", code: "007-26" },
      { name: "balances", code: "007-27" },
      { name: "balances", code: "007-34" },
      { name: "balances", code: "007-6" },
      { name: "balances", code: "007-20" },
      { name: "balances", code: "007-23" },
      { name: "balances", code: "007-24" },
      { name: "balances", code: "007-39" },
      { name: "balances", code: "007-40" },
      { name: "balances", code: "007-41" },
      { name: "balances", code: "007-42" },
      { name: "balances", code: "007-43" },
      { name: "balances", code: "007-44" },
      { name: "balances", code: "007-45" },
    ],
    reactor: [
      { name: "reactor", code: "002-10" },
      { name: "reactor", code: "002-11" },
      { name: "reactor", code: "002-12" },
      { name: "reactor", code: "002-13" },
      { name: "reactor", code: "002-14" },
      { name: "reactor", code: "002-15" },
      { name: "reactor", code: "002-16" },
      { name: "reactor", code: "002-17" },
    ],
    d_filter: [
      { name: "d_filter", code: "046-6" },
      { name: "d_filter", code: "046-7" },
    ],
    n_filter: [
      { name: "n_filter", code: "046-1" },
      { name: "n_filter", code: "046-10" },
      { name: "n_filter", code: "046-11" },
      { name: "n_filter", code: "046-12" },
      { name: "n_filter", code: "046-4" },
      { name: "n_filter", code: "046-5" },
    ],
    m_pump: [
      { name: "m_pump", code: "001-22" },
      { name: "m_pump", code: "001-23" },
      { name: "m_pump", code: "001-24" },
    ],
    p_pump: [
      { name: "p_pump", code: "001-13" },
      { name: "p_pump", code: "001-21" },
      { name: "p_pump", code: "001-29" },
    ],    
    o_pump: [
      { name: "o_pump", code: "001-38" },
      { name: "o_pump", code: "001-43" },
    ],
    oven: [
      { name: "oven", code: "012-10" },
      { name: "oven", code: "012-13" },
      { name: "oven", code: "012-14" },
      { name: "oven", code: "012-15" },
      { name: "oven", code: "012-16" },
      { name: "oven", code: "012-17" },
      { name: "oven", code: "012-20" },
    ],
    // Add more equipment types as needed
  };

  // Return the simulated equipment list for the specified type
  return equipmentMap[equipmentType] || [];
}

/**
 * Simulates retrieving a list of all equipment with a delay.
 * @returns {Promise<Array>} A promise that resolves with the simulated list of all equipment.
 */
async function GetEquipmentListMOCK() {
  await delay(500); // Simulating a delay of 500ms

  // Simulated list of all equipment
  const equipmentList = [
    { name: "balances", code: "007-10" },
    { name: "balances", code: "007-11" },
    { name: "balances", code: "007-12" },
    { name: "pump", code: "001-10" },
    { name: "pump", code: "001-11" },
    { name: "pump", code: "001-12" },
    { name: "reactor", code: "002-10" },
    { name: "reactor", code: "002-11" },
    { name: "reactor", code: "002-12" },
    { name: "reactor", code: "002-13" },
    { name: "jug", code: "tile" },
    { name: "jug", code: "waste" },
    { name: "funnel", code: "funnel-1" },
    { name: "funnel", code: "funnel-2" },
    { name: "funnel", code: "funnel-3" },
    { name: "d_filter", code: "046-6" },
    { name: "n_filter", code: "046-5" },
    { name: "m_pump", code: "001-22" },
    { name: "m_pump", code: "001-23" },
    { name: "m_pump", code: "001-24" },
    { name: "p_pump", code: "001-13" },
    { name: "p_pump", code: "001-21" },
    { name: "p_pump", code: "001-29" },
    // Add more equipment as needed
  ];

  return equipmentList;
}


// Export all functions together
export {
  GetAuthTokenMOCK,
  GetParametersForOperationsMOCK,
  GetListEquipmentTypesMOCK,
  GetListActivityMOCK,
  GetEquipmentListByTypeMOCK,
  GetEquipmentListMOCK
};