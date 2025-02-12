'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrStates = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign(currentState, action.extraData);
        break;
      case 'removeProperties':
        const newState = {};

        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            newState[key] = currentState[key];
          }
        }

        currentState = newState;
        break;
      case 'clear':
        currentState = {};
        break;
    }

    arrStates.push({ ...currentState });
  }

  return arrStates;
}

module.exports = transformStateWithClones;
