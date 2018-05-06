const { getNow, dispatch } = require('./helpers');
const appConfig = require('electron-settings');

function getQueue() {
  return appConfig.get('userData.unsentSessions');
}

function setQueue(q) {
  appConfig.set('userData.unsentSessions', q);
}

function cleanQueue(queue) {
  return queue.filter(q => q.length > 0);
}

function getCurrentSessionHits() {
  return appConfig.get('userData.currentSessionHits');
}

function setCurrentSessionHits(hits) {
  return appConfig.set('userData.currentSessionHits', hits);
}

async function processQueue(q) {
  const q1 = [];
  for (const [index, batch] of q.entries()) {
    const failedItems = await dispatchBatch(batch);
    q1.push(failedItems);
  }
  return q1;
}

async function dispatchBatch(session) {
  const failedItems = [];
  for (const [index, item] of session.entries()) {
    // Prep item
    const isFirst = index === 0;
    const isLast  = index === session.length - 1;
    const payload = prepItem(item, isFirst, isLast);
    // Send payload
    await dispatch(payload)
      .then(res => {
        if (res !== 200) {
         failedItems.push(payload);
        }
      })
      .catch(err => {
         failedItems.push(payload);
      })
  }
  return failedItems;
}

// Update sessionControl and queueTime params
function prepItem(payload, isFirst=false, isLast=false) {
  const now = getNow();
  const updatedPayload = Object.assign({}, payload, {
    qt: now - payload.__timeStamp,
  });
  if (isFirst) {
    return Object.assign({}, updatedPayload, {
      sc: "start"
    })
  }
  if (isLast) {
    return Object.assign({}, updatedPayload, {
      sc: "end"
    })
  }
  return updatedPayload;
}

module.exports = {
  processQueue,
  getQueue,
  setQueue,
  cleanQueue,
  getCurrentSessionHits,
  setCurrentSessionHits,
}
