type TPanelStatus = {
  visible: boolean;
  params?: unknown;
};

/** The Store RequestInterface to control its related status */
class RequestInterfaceStore {
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

export type TRequestInterfaceStore = InstanceType<typeof RequestInterfaceStore>;

export default RequestInterfaceStore;
