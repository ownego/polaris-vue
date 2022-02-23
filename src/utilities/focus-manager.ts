export class FocusManager {
  public trapFocusList: string[] = [];

  add(id: string) {
    this.trapFocusList = [...this.trapFocusList, id];
  }

  remove(id: string) {
    const index = this.trapFocusList.indexOf(id);
    if (index > -1) {
      this.trapFocusList = this.trapFocusList.splice(index, 1);
    }
    return index > -1;
  }
}
