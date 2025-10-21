export class SchedaModel {
  id?: number;
  startDate?: string;
  endDate?: string;

  constructor(obj?: Partial<SchedaModel>) {
    if (obj) Object.assign(this, obj);
  }
}
