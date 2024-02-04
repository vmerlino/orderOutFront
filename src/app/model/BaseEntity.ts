export class BaseEntity {
    id: number;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    isDeleted: boolean;
  
    constructor(
      id: number,
      createdOn: Date,
      createdBy: string,
      modifiedOn: Date,
      modifiedBy: string,
      isDeleted: boolean
    ) {
      this.id = id;
      this.createdOn = createdOn;
      this.createdBy = createdBy;
      this.modifiedOn = modifiedOn;
      this.modifiedBy = modifiedBy;
      this.isDeleted = isDeleted;
    }
  }
  