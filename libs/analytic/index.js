const {
  getQueue,
  setQueue,
  cleanQueue,
  processQueue,
  getCurrentSessionHits,
  setCurrentSessionHits,
} = require('./q');
const { getNow, getDefaultParams, dispatch } = require('./helpers');

class Analytics {
  constructor(trackingID, clientID, options = {}) {
    if (!trackingID || !clientID) {
      throw new Error('trackingID and clientID required');
    }
    this.initialParams = Object.assign({}, options, getDefaultParams(), {
      tid: trackingID,
      cid: clientID,
    });
    this.currentSessionHits = [];
    this.init();
  }

  async init() {
    const unsentSessions = getQueue();
    const currentSessionHits = getCurrentSessionHits();
    const q = [...unsentSessions, currentSessionHits];
    if (q.length === 0) return;
    const q1 = await processQueue(q);
    const q2 = cleanQueue(q1);
    // Reset both queues
    setQueue(q2);
    setCurrentSessionHits([]);
  }

  track(hitType, hitParams) {
    const payload = this._getPayload(hitType, hitParams, getNow());
    dispatch(payload)
      .then(res => {
        console.log('Hit sent successfully', res);
      })
      .catch(err => {
        this.currentSessionHits.push(payload);
        setCurrentSessionHits(this.currentSessionHits);
      });
  }

  _getPayload(hitType, hitParams = {}, time) {
    return Object.assign(
      {},
      this.initialParams,  // Initial params
      hitParams,           // Additional hit params
      {
        t: hitType,        // hitType
        dp: hitParams.cd,  // Page
        __timeStamp: time, // Use to calculate qt
      }
    );
  }
}

module.exports = Analytics;
