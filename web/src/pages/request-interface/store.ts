type TPanelStatus = {
  visible: boolean;
  params?: unknown;
};

interface IRequestData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

/** The Store RequestInterface to control its related status */
class RequestInterfaceStore {
  curRequestData: IRequestData = {
    method: 'GET',
  };
  requestDataMemory = {};
  /**
   * Update status of RequestPanel, including 'visible' and 'params'.
   * @param {IRequestData} newVal - The new status of RequestPanel.
   */
  setRequestData(newVal: IRequestData) {
    this.curRequestData = newVal;
  }
  panelStatus: TPanelStatus = {
    visible: false,
  };
  /**
   * Update status of RequestPanel, including 'visible' and 'params'.
   * @param {TPanelStatus} e - The new status of RequestPanel.
   */
  updatePanelStatus(e: TPanelStatus) {
    this.panelStatus = e;
  }
}

export default RequestInterfaceStore;
