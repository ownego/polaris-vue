export class PortalManager {
  private portalIds: string[] = [];

  register(id: string) {
    if (!this.portalIds.includes(id)) {this.portalIds.push(id);}
  }

  hasContainer() {
    return this.portalIds.length;
  }
}
