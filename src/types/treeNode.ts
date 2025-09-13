export interface TreeNode {
  Key_ID: number;         //id
  Head_ID: number;        //parentId
  ID: string;             //name
  Display_Value: string;  //displayValue
  Description: string;    //description
  Addr?: string;          //arcnetAddress
  Global_ID?: string;     //globalId
}